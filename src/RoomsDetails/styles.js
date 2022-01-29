import styled from "styled-components";

export const RoomsDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 30em;
  width: 30em;
  row-gap: 1em;
`;

export const Heading = styled.h2`
  margin: 0px;
`;

export const RoomDetails = styled.div`
  display: flex;
  padding: 1em;
  border: 1px solid #eee;
  flex-direction: column;
  row-gap: 0.3em;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#eee" : "white")};
  border: ${(props) => (props.selected ? "1px solid black" : "1px solid #eee")};

  &:hover {
    background-color: #eee;
    border: 1px solid black;
  }
`;

export const RoomName = styled.div`
  font-weight: bold;
`;

export const SaveBtn = styled.div`
  padding: 1em;
  background-color: blue;
  color: white;
  text-align: center;
  align-self: center;
  min-width: 150px;
  cursor: pointer;
`;
