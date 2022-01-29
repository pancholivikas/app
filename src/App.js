import { Routes, Route, Link } from "react-router-dom";
import MeetingsOverview from "./MeetingOverview/component";
import AddMeeting from "./AddMeeting/component";
import RoomsDetails from "./RoomsDetails/component";
import { Container } from "./styles";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<MeetingsOverview />} />
        <Route path="/addNewMeeting/:buildingsName" element={<AddMeeting />} />
        <Route path="/saveMeeting/:meetingDetails" element={<RoomsDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
