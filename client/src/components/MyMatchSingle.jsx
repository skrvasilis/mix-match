import React, { useContext, useEffect } from "react";
import MyContext from "../MyContext";

export default function MyMatchSingle() {
  const {genresSorted,
    artistsSorted,
    selectedUser,}= useContext(MyContext)


    useEffect(()=>{
      if(selectedUser) {
        console.log(genresSorted)
        console.log(artistsSorted)
        console.log(selectedUser)
      }
    },[selectedUser])
  return (
    <div className="main">
      <div className="content">
        <h1>{`You and otherUser`}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />

        <ul className="results">
            <h4>The same Artists you like</h4>
          <li>
            <h4>Artist 1</h4>
            <img
              className="list-avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="avatar"
            />
          </li>
        </ul>

        <ul className="results">
        <h4>The same Genres you like</h4>
          <li>
            <h4>Genre 1</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}
