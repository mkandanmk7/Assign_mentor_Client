import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";
function MentorForm() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);
  console.log(mentors);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [course, setcourse] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const posted_mentor = await axios.post(
      `https://muthu-mentors-server.herokuapp.com/Mentors`,
      { name, email, course }
    );
    setMentors([...mentors, posted_mentor.data]);
    setname("");
    setemail("");
    setcourse("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-info">Mentor Form</h4>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Mentor Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="course" className="form-label">
          Course<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="course"
          value={course}
          onChange={(e) => {
            setcourse(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
}

export default MentorForm;
