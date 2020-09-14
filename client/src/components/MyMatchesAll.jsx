import React from "react";

export default function MyMatch() {
  return (
    <div className="main">
      <div className="content">
      <h1>{`Top 5 matches of userName!`}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <ul className="results">
          <li>
            <h4>Number 1</h4>
            <img
              className="list-avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="avatar"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
