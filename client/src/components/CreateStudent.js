/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { fetchStudentsData } from "../utils/fetchData";
import { capitalizeFirstLetter } from "../utils/stringUtils";

export default function CreateStudent(props) {
  const studentId = props.match.params.id;
  const [student, setStudent] = useState({
    data: { name: "", email: "", age: "", marks: "", city: "" },
    loading: true,
    error: null,
  });
  const [uploadPercentage, setUploadPercentage] = useState("");
  const profileNode = useRef(null);

  const fetchStudent = useCallback(async () => {
    await fetchStudentsData(
      `${process.env.REACT_APP_API_URL}/student-by-id/?id=${studentId}`,
      setStudent
    );
    if (student.error?.message !== "Invalid user Id") return false;
    alert(student.error.message);
    props.history.push("/");
  }, []);

  useEffect(() => {
    studentId && fetchStudent();
  }, []);

  function isValid() {
    if (!student.data) return alert("Please fill all required fields.");
    const fieldNames = Object.keys(student.data);
    for (let index = 0; index < fieldNames.length; index++) {
      const key = fieldNames[index];
      const value = student.data[key];
      if (!value.trim())
        return alert(`${capitalizeFirstLetter(key)} can't be empty`);
    }
    submit();
  }

  function updateStudent() {
    const formData = new FormData();
    formData.append("_id", studentId);
    formData.append("name", student.data.name);
    formData.append("city", student.data.city);
    formData.append("marks", student.data.marks);
    formData.append("age", student.data.age);
    formData.append("email", student.data.email);
    formData.append("profile", profileNode.current.files[0]);

    if (formData.get("profile") === "undefined")
      return axios
        .post(process.env.REACT_APP_API_URL + "/short-update", {
          id: studentId,
          ...student.data,
        })
        .then((res) => alert(res.data.data))
        .catch((err) => console.log(err));

    axios
      .post(process.env.REACT_APP_API_URL + "/update-student", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then((res) => alert(res.data.data))
      .catch((err) => {
        alert("Sorry, server side error occurred");
        console.log(err);
      });
  }

  function submit() {
    if (studentId) return updateStudent();
    axios
      .post(process.env.REACT_APP_API_URL + "/create-student", student.data)
      .then(() => alert("Student Data Created Successfully"))
      .catch(() => alert("Internal Server Error"));
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-0 ">
            <div className="card-header py-0">
              <h3 className="text-center font-weight-light my-4">
                {studentId ? "Update Student" : "Create Student"}
              </h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="inputName">Name</label>
                  <input
                    name="name"
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        data: { ...student.data, name: e.target.value },
                      });
                    }}
                    value={student.data.name}
                    className="form-control"
                    id="inputName"
                    type="text"
                    placeholder="Enter Student Name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputEmail">Email address</label>
                  <input
                    name="email"
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        data: { ...student.data, email: e.target.value },
                      });
                    }}
                    value={student.data.email}
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputAge">Age</label>
                  <input
                    name="age"
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        data: { ...student.data, age: e.target.value },
                      });
                    }}
                    value={student.data.age}
                    className="form-control"
                    id="inputAge"
                    type="number"
                    placeholder="Enter Student Age"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputMarks">Marks</label>
                  <input
                    name="marks"
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        data: { ...student.data, marks: e.target.value },
                      });
                    }}
                    value={student.data.marks}
                    className="form-control"
                    id="inputMarks"
                    type="number"
                    placeholder="Enter Student Marks"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputCity">City</label>
                  <select
                    name="city"
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        data: { ...student.data, city: e.target.value },
                      });
                    }}
                    value={student.data.city}
                    className="form-control"
                    id="inputCity"
                  >
                    <option value="">Please select a city</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Goa">Goa</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {!studentId ? (
                  <></>
                ) : (
                  <div className="form-group mb-3">
                    <label htmlFor="profilePic">Profile Picture</label>
                    <input
                      name="profilePic"
                      ref={profileNode}
                      className="form-control"
                      type="file"
                    />
                    {uploadPercentage && uploadPercentage + "% uploaded"}
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                  <span className="btn btn-primary" onClick={() => isValid()}>
                    {studentId ? "Update Student" : "Create Student"}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
