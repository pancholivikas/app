import styled from "styled-components";

export const MeetingsOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

export const DetailsView = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 30em;
  height: 30em;
`;

export const DropDownContainer = styled.div`
  align-self: center;
`;

export const Details = styled.div`
  flex: 1 1 100%;
  padding: 1em;
  border: 1px solid #eee;
`;

export const Heading = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const AddMeetingNav = styled.nav`
  flex-grow: 1;
  text-align: center;
  padding: 1em;
  background-color: blue;

  a {
    display: flex;
    color: white;
    justify-content: center;
  }
`;
