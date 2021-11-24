import React, { useState, useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";

function AssignorChangeMentor() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);

  console.log(setMentors);
  const [student, setStudent] = useState("");
  const [mentor, setMentor] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated_mentor = await axios.patch(
      `https://muthu-mentors-server.herokuapp.com/Students/assign-mentor/${student}`,
      { mentor }
    );
    console.log(updated_mentor);
    const stud_data = await axios.get(
      `https://muthu-mentors-server.herokuapp.com/Students`
    );
    setStudents(stud_data.data);
    setStudent("");
    setMentor("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">Change Mentor</h4>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Student<span style={{ color: "red" }}>*</span>
          </label>
          <select
            class="form-control"
            aria-label="Default select example"
            value={student}
            onChange={(e) => {
              setStudent(e.target.value);
            }}
          >
            <option value=""></option>
            {students.map((student) => {
              return <option value={student._id}>{student.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Mentor<span style={{ color: "red" }}>*</span>
          </label>
          <select
            class="form-control"
            aria-label="Default select example"
            value={mentor}
            onChange={(e) => {
              setMentor(e.target.value);
            }}
          >
            <option value=""></option>
            {mentors.map((mentor) => {
              return <option value={mentor._id}>{mentor.name}</option>;
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignorChangeMentor;
