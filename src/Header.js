import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      <div className="heading">
        <h1>
          <Link className="nav-link" to="/" title="Go to Landing Page">
            ✐✍︎✓NOTES
          </Link>{" "}
        </h1>
      </div>
    </div>
  );
}
