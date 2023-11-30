import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function ListStudents(props) {
  const [students, setStudents] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const fetchStudents = useCallback(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/list-students")
      .then((res) =>
        setStudents((s) => {
          return { ...s, data: res.data.data };
        })
      )
      .catch((error) =>
        setStudents((s) => {
          return { ...s, error: error };
        })
      )
      .finally(() =>
        setStudents((s) => {
          return { ...s, loading: false };
        })
      );
  }, []);

  useEffect(() => fetchStudents(), [fetchStudents]);

  function doAction(id, action) {
    if (action === "update") return props.history.push("/create-student/" + id);
    const selectedStudentName = students.data.filter((st) => st._id === id)[0]
      .name;
    const deleteConfirmation = window.confirm(
      "Do you wanna delete " + selectedStudentName + "'s data"
    );
    if (!deleteConfirmation) return false;
    axios
      .get(process.env.REACT_APP_API_URL + "/delete-student?id=" + id)
      .then((res) => alert(res.data.data))
      .catch(() => alert("Internal Server Error 😵"))
      .finally(() => fetchStudents());
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
          {students.data.length ? (
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
                {students.data.map((st) => (
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
                        onClick={() => doAction(st._id, "delete")}
                      >
                        &nbsp;Delete{" "}
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-primary"
                        onClick={() => doAction(st._id, "update")}
                      >
                        &nbsp;Update{" "}
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
          ) : (
            <>
              {students.error ? (
                <h3 className="text-center">Internal Server Error 😵</h3>
              ) : (
                <h3 className="text-center">
                  {students.loading ? "Loading..." : "Students list is empty."}
                </h3>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
