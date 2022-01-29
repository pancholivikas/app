import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../common/DropDown/component";
import useFetch from "../hooks/useFetch";
import {
  MeetingsOverviewContainer,
  DetailsView,
  Details,
  Heading,
  AddMeetingNav,
  DropDownContainer,
} from "./styles";

const query = `{
  Buildings {
  name
  id
  meetingRooms {
      id
      name
      meetings {
          title
          date
          startTime
          endTime
      }
  }
}
}`;

const handleResponse = ({ data }) => {
  const { Buildings = [] } = data;
  let buildingsCount = Buildings.length;
  let buildingNames = [];

  let meetingData = {
    buildingsCount,
    buildingNames,
    totalMeetingRooms: 0,
    availableMeetingRooms: 0,
    totalMeetingsToday: 0,
    totalMeetingRunning: 0,
  };

  Buildings.forEach((building) => {
    const { meetingRooms = [], name = "" } = building;
    meetingData.totalMeetingRooms += meetingRooms.length;
    meetingData.availableMeetingRooms += meetingRooms.length;
    meetingData.buildingNames.push(name);
    meetingRooms.forEach((meetingRoom) => {
      const { meetings = [] } = meetingRoom;
      meetings.forEach((meeting) => {
        const { date: meetingDate, endTime, startTime } = meeting;
        const date = new Date();
        const [month, day, year] = [
          date.getMonth() + 1,
          date.getDate(),
          date.getFullYear(),
        ];
        const [hour, minutes] = [date.getHours(), date.getMinutes()];

        if (meetingDate === `${day}/${month}/${year}`) {
          meetingData.totalMeetingsToday++;
        }

        if (
          parseInt(hour) >= parseInt(startTime.split(":")[0]) &&
          parseInt(minutes) >= parseInt(startTime.split(":")[1]) &&
          parseInt(hour) <= parseInt(endTime.split(":")[0]) &&
          parseInt(minutes) <= parseInt(endTime.split(":")[1])
        ) {
          meetingData.totalMeetingRunning++;
          meetingData.availableMeetingRooms--;
        }
      });
    });
  });

  return meetingData;
};

const MeetingsOverview = () => {
  const { data: meetingData } = useFetch(
    "http://smart-meeting.herokuapp.com/graphql",
    "POST",
    query,
    handleResponse,
    []
  );

  const onBuildingChange = (ev) => {};

  return (
    <MeetingsOverviewContainer>
      <DropDownContainer>
        <DropDown
          handleChange={onBuildingChange}
          data={meetingData?.buildingNames || []}
        />
      </DropDownContainer>
      <DetailsView>
        <Details>
          <Heading>Buildings</Heading>
          <div>Total {meetingData?.buildingsCount}</div>
        </Details>
        <Details>
          <Heading>Rooms</Heading>
          <div>Total {meetingData?.totalMeetingRooms}</div>
          <div>Free Now {meetingData?.availableMeetingRooms}</div>
        </Details>
        <Details>
          <Heading>Meetings</Heading>
          <div>Total {meetingData?.totalMeetingsToday} Today</div>
          <div>Total {meetingData?.totalMeetingRunning} Going on now</div>
        </Details>
      </DetailsView>
      <AddMeetingNav>
        <Link to={`/addNewMeeting/${meetingData?.buildingNames || []}`}>
          Add a Meeting
        </Link>
      </AddMeetingNav>
    </MeetingsOverviewContainer>
  );
};

export default MeetingsOverview;
