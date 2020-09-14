import React from "react";

export default function Welcome() {
  return (
    <div className="main">
      <div className="content">
        <h1>{`Welcome Name!`}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <h3>Now we know your music taste</h3>
        <ul className="results">
        <h4>Your top 5 Artists are:</h4>
          <li>
           <h4>Item 1</h4> 
            <img
              className="artist-avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="avatar"
            />
          </li>
         
        </ul>
        <ul className="results">
          Your top 5 music genres:
          <li>Genre 1</li>
        </ul>
        <button>Click here to find people with similar taste</button>
      </div>
    </div>
  );
}
