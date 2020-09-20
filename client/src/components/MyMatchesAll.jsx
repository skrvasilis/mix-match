import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { genresSorted, artistsSorted, userData, setSelectedUser } = useContext(
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
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <ul className="results">
          {/* <Link to="/mymatch">  */}
          {genresSorted &&
            genresSorted.map((item) => {
              return (
                <li>
                  <button onClick={() => setSelectedUser(item.userName)}>
                    <Link to="/mymatch">
                      <h4>{item.userName}</h4>
                      <img
                        className="list-avatar"
                        src={item.userImage}
                        alt="avatar"
                      />
                    </Link>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
