import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notFound-wrapper">
      <div className="notFound-main">
        <div className="notFound-err">4</div>
        <i className="notFound-far far fa-question-circle fa-spin"></i>
        <div className="notFound-err2">4</div>
        <div className="notFound-msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go{" "}
            <NavLink className="nav-link" to="/">
              home
            </NavLink>{" "}
            and try from there.
          </p>
        </div>
      </div>
    </div>
  );
}
