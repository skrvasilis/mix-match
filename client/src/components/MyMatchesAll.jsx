import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const {
    genresSorted,
    artistsSorted,
    userData,
    setSelectedUser,
    userImage,
    dataBase,
    savedData,
  } = useContext(MyContext);

  useEffect(() => {
    let check = dataBase.find(({ userID }) => userID === userData.id);
    console.log(check);
    console.log(savedData);
    console.log(dataBase, "database");
    if (!check) {
      console.log("postrun");
      // fetch("http://localhost:5000/user", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(...savedData),
      // });
    }
  }, []);

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
        <img className="avatar" src={userImage && userImage} alt="avatar" />
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
