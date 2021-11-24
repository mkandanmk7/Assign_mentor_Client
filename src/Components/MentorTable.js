import React, { useContext } from "react";
import { AssignMentorsContext } from "../Context/AssignMentors";

function MentorTable() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);
  console.log(setMentors);
  return (
    <div>
      <h3 className="text-info">Mentor List</h3>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Course</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => {
            return (
              <tr key={mentor._id}>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.course}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MentorTable;
