import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { genresSorted, artistsSorted, userData, setSelectedUser, userImage } = useContext(
    MyContext
  );

  useEffect(() => {
    if (genresSorted) {
      console.log(genresSorted);
      console.log(artistsSorted);
    }
  }, [userData]);

  return (
    <div className="main">
      <div className="content">
        <h1>{`Top 5 matches of ${userData && userData.display_name}`}</h1>
        <img
          className="avatar"
          src={userImage && userImage}
          alt="avatar"
        />
        <ul className="results">
          {/* <Link to="/mymatch">  */}
          {genresSorted &&
            genresSorted.map((item) => {
              return (
                <li
                  className="result"
                  onClick={() => setSelectedUser(item.userName)}
                >
                  <Link className="list-link" to="/mymatch">
                    <h4>{item.userName}</h4>
                    <img
                      className="list-avatar"
                      src={item.userImage}
                      alt="avatar"
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
