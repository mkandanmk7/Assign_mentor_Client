import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";

function ShowMentorStudents() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);
  console.log(setMentors);
  console.log(mentors);
  const [mentor, setMentor] = useState("");
  const [studList, setStudList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student_list = await axios.get(
      `https://muthu-mentors-server.herokuapp.com/Students/mentor-students/${mentor}`
    );
    console.log(student_list);
    setStudList(student_list.data);
    setMentor("");
  };
  return (
    <div>
      <h4 className="text-info">Students List based on Mentor Selection</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="mentor" className="form-label">
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
          Show
        </button>
      </form>
      {studList.length ? (
        <>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Batch</th>
              </tr>
            </thead>
            <tbody>
              {studList.map((student) => {
                return (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.batch}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowMentorStudents;
