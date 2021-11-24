import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MultiSelect from "multiselect-react-dropdown";
import { AssignMentorsContext } from "../Context/AssignMentors";

function AssignStudentsToMentor() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);
  console.log(setMentors);
  const [mentor, setMentor] = useState("");

  const [options, setOptions] = useState([]);
  let arrayval = [];
  useEffect(() => {
    students.map(
      (student) =>
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (arrayval = [...arrayval, { name: student.name, value: student._id }])
    );
    setOptions(arrayval);
  }, [students]);

  let selectedOptions = [],
    removedOptions = [];
  const onSelect = (data) => {
    selectedOptions = data;
  };
  const onRemove = (data) => {
    removedOptions = data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log("removed and selected");
        console.log(removedOptions,selectedOptions) */
    let selectedStudents = removedOptions.length
      ? removedOptions
      : selectedOptions;
    /* console.log("selected studs")
        console.log(selectedStudents) */
    const stud_list = selectedStudents.map((stud) => {
      return stud.value;
    });
    /* console.log("value sent to api")
        console.log(stud_list,mentor); */
    await axios.patch(
      `https://muthu-mentors-server.herokuapp.com/Students/assign-mentor-students`,
      { mentor, stud_list }
    );
    const stud_data = await axios.get(
      `https://muthu-mentors-server.herokuapp.com/Students`
    );
    /* console.log(stud_data.data) */
    setStudents(stud_data.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">Assign Students to Mentor</h4>
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
        <div className="mb-3">
          <label htmlFor="students" className="form-label">
            Students<span style={{ color: "red" }}>*</span>
          </label>
          {/* <select multiple onChange={handleChange} class="form-control selectpicker">
                        {
                            students.map(student => {
                                return <option value={student._id}>{student.name}</option>
                            })
                        }
                    </select> */}
          <div class="chat-container">
            <MultiSelect
              options={options}
              displayValue="name"
              onSelect={onSelect}
              onRemove={onRemove}
              style={{
                searchBox: {
                  background: "white",
                },
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignStudentsToMentor;
