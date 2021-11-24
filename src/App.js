import "./App.css";
import MentorForm from "./Components/MentorForm";
import StudentForm from "./Components/StudentForm";
import AssignorChangeMentor from "./Components/AssignorChangeMentor";
import MentorTable from "./Components/MentorTable";
import StudentTable from "./Components/StudentTable";
import AssignStudentsToMentor from "./Components/AssignStudentsToMentor";
import { AssignMentorProvider } from "./Context/AssignMentors";
import ShowMentorStudents from "./Components/ShowMentorStudents";
function App() {
  return (
    <div className="container">
      <h2
        style={{ textAlign: "center", color: "seagreen", marginBottom: "2rem" }}
      >
        Zen Mentors
      </h2>
      <AssignMentorProvider>
        <div className="row">
          <div className="col-md-5 col-sm-12">
            <MentorForm />
            <StudentForm />
            <AssignorChangeMentor />
            <AssignStudentsToMentor />

            <ShowMentorStudents />
          </div>
          <div className="col-md-7 col-sm-12">
            <MentorTable />
            <StudentTable />
          </div>
        </div>
      </AssignMentorProvider>
    </div>
  );
}

export default App;
