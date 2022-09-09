import "./App.css";
import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { NavLink, Route, Switch } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import ListStudents from "./components/ListStudents";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <>
        <nav
          className="sb-topnav sticky-top navbar navbar-expand-lg navbar-dark bg-dark"
          id="rightOnTop"
        >
          <NavLink className="navbar-brand ps-3" to="/" id="brand_top">
            Students Database
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav w-100 px-lg-5 text-center bg-dark me-auto my-2 my-lg-0 justify-content-end">
              <li className="nav-item">
                <NavLink className="nav-link" to="/list-students">
                  <i className="fas fa-chart-area"></i> List Students
                </NavLink>
              </li>
              <li className="nav-item" style={{ marginBottom: "0.4rem" }}>
                <NavLink className="nav-link" to="/create-student">
                  <i className="fas fa-table"></i> Create Students
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <main className="content-area">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/list-students" component={ListStudents} />
            <Route path="/create-student/:id" component={CreateStudent} />
            <Route path="/create-student" component={CreateStudent} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
