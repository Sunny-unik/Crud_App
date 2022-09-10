import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateStudent(props) {
  const studentId = props.match.params.id;
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [marks, setmarks] = useState("");
  const [city, setcity] = useState("");
  const [uploadPercentage, setuploadPercentage] = useState("");
  let profile;

  useEffect(() => {
    if (studentId) {
      axios
        .get(process.env.REACT_APP_API_URL + "/student-by-id/?id=" + studentId)
        .then(res => {
          setname(res.data.data[0].name);
          setemail(res.data.data[0].email);
          setage(res.data.data[0].age);
          setmarks(res.data.data[0].marks);
          setcity(res.data.data[0].city);
        });
    }
  }, [studentId]);

  function setvalue(e) {
    e.target.name === "name" && setname(e.target.value);
    e.target.name === "age" && setage(e.target.value);
    e.target.name === "email" && setemail(e.target.value);
    e.target.name === "marks" && setmarks(e.target.value);
    e.target.name === "city" && setcity(e.target.value);
  }

  function setprofile(e) {
    profile = e.target.files[0];
  }

  function isValid() {
    if (document.getElementById("inputName").value === "") {
      alert("name can't be empty");
      return false;
    }
    if (document.getElementById("inputEmail").value === "") {
      alert("email can't be empty");
      return false;
    }
    if (document.getElementById("inputAge").value === "") {
      alert("age can't be empty");
      return false;
    }
    if (document.getElementById("inputMarks").value === "") {
      alert("marks can't be empty");
      return false;
    }
    if (document.getElementById("inputCity").value === "") {
      alert("city can't be empty");
      return false;
    }
    submit();
  }

  function updateStudent() {
    const formData = new FormData();
    formData.append("_id", studentId);
    formData.append("name", name);
    formData.append("city", city);
    formData.append("marks", marks);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("profile", profile);

    if (formData.get("profile") === "undefined") {
      alert("Please select a profile image");
      return false;
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/update-student", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(progressEvent) {
          // console.log("file Uploading Progresss....... ", progressEvent);
          setuploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          );
          //setfileInProgress(progressEvent.fileName)
        }
      })
      .then(res => {
        alert(res.data.data);
      })
      .catch(res => {
        alert("Sorry, server side error occurred");
      });
  }

  function submit() {
    if (studentId) {
      updateStudent();
      return false;
    }

    const studentObj = { name, age, email, marks, city };
    axios
      .post(process.env.REACT_APP_API_URL + "/create-student", studentObj)
      .then(res => {
        alert("Student Created Successfully");
      })
      .catch(res => {
        alert(res.data.data);
      });
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
                    value={name}
                    name="name"
                    onChange={e => {
                      setvalue(e);
                    }}
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
                    onChange={e => {
                      setvalue(e);
                    }}
                    value={email}
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputAge"> Age </label>
                  <input
                    name="age"
                    onChange={e => {
                      setvalue(e);
                    }}
                    className="form-control"
                    value={age}
                    id="inputAge"
                    type="number"
                    placeholder="Enter Student Age"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputMarks">Marks</label>
                  <input
                    name="marks"
                    onChange={e => {
                      setvalue(e);
                    }}
                    className="form-control"
                    value={marks}
                    id="inputMarks"
                    type="number"
                    placeholder="Enter Student Marks"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputCity">City</label>
                  <select
                    name="city"
                    onChange={e => {
                      setvalue(e);
                    }}
                    className="form-control"
                    value={city}
                    id="inputCity"
                  >
                    <option value="Jaipur">Jaipur</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Goa">Goa</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {!studentId ? (
                  <hr />
                ) : (
                  <div className="form-group mb-3">
                    <label htmlFor="profilepic">Profile Picture</label>
                    <input
                      name="profilepic"
                      onChange={e => setprofile(e)}
                      className="form-control"
                      value={profile}
                      type="file"
                    />
                    {uploadPercentage && uploadPercentage + "% uploaded"}
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                  <span
                    className="btn btn-primary"
                    onClick={() => {
                      studentId ? submit() : isValid();
                    }}
                  >
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
