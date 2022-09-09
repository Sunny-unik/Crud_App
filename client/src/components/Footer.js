import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-end small">
          <details>
            <summary className="text-muted">
              Copyright &copy; crud_page{" "}
            </summary>
            <p>
              {" "}
              &middot; by <FaGithub />{" "}
              <a
                target="blank"
                rel="noreferrer"
                href="https://github.com/Sunny-unik/"
              >
                @Sunny-unik
              </a>
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
