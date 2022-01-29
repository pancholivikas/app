import { useEffect, useState } from "react/cjs/react.development";
import { useNavigate, useParams } from "react-router-dom";
import {
  RoomsDetailsContainer,
  RoomDetails,
  SaveBtn,
  Heading,
  RoomName,
} from "./styles";
import useFetch from "../hooks/useFetch";

const query = `{
  MeetingRooms {
      id
      name
      floor
      building {
          name
      }
      meetings {
          id
          title
          date
          startTime
          endTime
      }
  }
}`;

const payload = ({ id, title, date, startTime, endTime, meetingRoomId }) => {
  return `
    mutation {
      Meeting(
      id: ${id}
      title: "${title}"
      date: "${date}"
      startTime: "${startTime}"
      endTime: "${endTime}"
      meetingRoomId: ${meetingRoomId}
      ) {
      id
      title
      }
    }`;
};

const handleResponse = ({ data }) => {
  const { MeetingRooms = [] } = data;

  const availableRooms = [];

  MeetingRooms.forEach((meetingRoom) => {
    const {
      name: meetingRoomName,
      floor,
      building: { name: buildingName },
      meetings = [],
      id: meetingRoomId,
    } = meetingRoom;

    let isBooked = false;

    meetings.forEach((meeting) => {
      const { date: meetingDate, startTime, endTime } = meeting;

      const date = new Date();
      const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
      ];
      const [hour, minutes] = [date.getHours(), date.getMinutes()];

      if (
        meetingDate === `${day}/${month}/${year}` &&
        parseInt(hour) >= parseInt(startTime.split(":")[0]) &&
        parseInt(minutes) >= parseInt(startTime.split(":")[1]) &&
        parseInt(hour) <= parseInt(endTime.split(":")[0]) &&
        parseInt(minutes) <= parseInt(endTime.split(":")[1])
      ) {
        isBooked = true;
      }
    });

    if (!isBooked) {
      availableRooms.push({
        meetingRoomId,
        meetingRoomName,
        floor,
        buildingName,
      });
    }
  });

  return [...availableRooms];
};
const RoomsDetails = () => {
  const [meetingDetails, setMeetingDetails] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { data: availableRooms } = useFetch(
    "http://smart-meeting.herokuapp.com/graphql",
    "POST",
    query,
    handleResponse,
    []
  );

  useEffect(() => {
    try {
      const data = JSON.parse(params.meetingDetails);
      setMeetingDetails(data);
    } catch {}
  }, [params]);

  const handleSelectRoom = (roomDetails, index) => {
    const data = {
      ...roomDetails,
      ...meetingDetails,
    };
    setMeetingDetails(data);
    setSelectedIndex(index);
  };

  const handleSave = async () => {
    const {
      id = 1,
      title = "Meeting Title",
      date,
      startTime,
      endTime,
      meetingRoomId,
    } = meetingDetails;
    if (id && title && date && startTime && endTime && meetingRoomId) {
      const query = payload({
        id,
        title,
        date,
        startTime,
        endTime,
        meetingRoomId,
      });

      const response = await fetch(
        "http://smart-meeting.herokuapp.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: "a123gjhgjsdf6576",
          },
          body: JSON.stringify({
            query,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        navigate(`/`);
      }
    }
  };

  const filterdData = availableRooms.filter(
    (room) => room.buildingName === meetingDetails?.buildingName || ""
  );

  return (
    filterdData.length > 0 && (
      <RoomsDetailsContainer>
        <Heading>Please select one of the Available Rooms</Heading>
        {filterdData.map((availableRoom, index) => {
          const { meetingRoomName, floor, buildingName } = availableRoom;
          return (
            <RoomDetails
              key={index}
              selected={selectedIndex === index}
              onClick={() => handleSelectRoom(availableRoom, index)}
            >
              <RoomName>{meetingRoomName}</RoomName>
              <div>{buildingName}</div>
              <div>{floor}</div>
            </RoomDetails>
          );
        })}
        <SaveBtn onClick={handleSave}>Save</SaveBtn>
      </RoomsDetailsContainer>
    )
  );
};

export default RoomsDetails;
