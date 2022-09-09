import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function ListStundents(props) {
  const [students, setstudents] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/list-students")
      .then(res => setstudents(res.data.data));
  }, []);

  function doAction(id, action) {
    if (action === "update") {
      props.history.push("/create-student/" + id);
      return false;
    }

    const selectedStudentName = students.filter(st => st._id === id)[0].name;
    if (
      window.confirm("Do you wanna delete " + selectedStudentName + "'s data")
    ) {
      axios
        .get(process.env.REACT_APP_API_URL + "/delete-student?id=" + id)
        .then(res => alert(res.data.data));

      axios
        .get(process.env.REACT_APP_API_URL + "/list-students")
        .then(res => setstudents(res.data.data));
    }
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Student Table</h1>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          DataTable
        </div>
        <div className="card-body">
          <table id="datatablesSimple">
            <thead className="table-head">
              <tr>
                <th>Profile Picture</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Marks</th>
                <th>Email</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {students.map(st => (
                <tr key={st._id}>
                  <td>
                    <img
                      className="user-profile"
                      height="140px"
                      width="110px"
                      src={
                        st.profile
                          ? process.env.REACT_APP_API_URL + `/${st.profile}`
                          : "logo192.png"
                      }
                      alt="user profile"
                      loading="lazy"
                    />
                  </td>
                  <td>{st.name}</td>
                  <td>{st.age}</td>
                  <td>{st.city}</td>
                  <td>{st.marks}</td>
                  <td>{st.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        doAction(st._id, "delete");
                      }}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        doAction(st._id, "update");
                      }}
                    >
                      {" "}
                      Update{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-foot">
              <tr>
                <th>Profile Picture</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Marks</th>
                <th>Email</th>
                <th colSpan="2">Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
