import React, { useContext, useEffect } from "react";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";

export default function Welcome() {
  const {
    userData,
    myTop5FromSpotifyFetch,
    myAllGenresFromSpotifyFetch,
    userImage,
    savedData,
    dataBase
  } = useContext(MyContext);

 

  //To display only Firstname:
  const completeName =
    String(userData.display_name)[0].toUpperCase() +
    String(userData.display_name).substring(1);
  const displayFirstName = completeName.replace(/ .*/, "");

  return (
    <div className="main">
      <div className="content">
        <h1>Welcome {displayFirstName + "!"}</h1>
        <img
          className="avatar"
          src={userImage && userImage}
          alt="avatar"
        />
        <h2>Now we know your music taste</h2>
        <ul className="results">
          <h3>Your top 5 artists are:</h3>
          {myTop5FromSpotifyFetch &&
            myTop5FromSpotifyFetch.map((item) => {
              return (
                <li className="result">
                  <h4>{item && item.name}</h4>
                  <img
                    className="list-avatar"
                    src={item && item.images[2].url}
                    alt="avatar"
                  />
                </li>
              );
            })}
        </ul>
        <ul className="results">
          <h3>Your top 5 music genres:</h3>
          {myAllGenresFromSpotifyFetch &&
            myAllGenresFromSpotifyFetch.slice(0, 5).map((item) => {
              return (
                <li className="result">
                  <h4>{item}</h4>
                </li>
              );
            })}
        </ul>
        <Link to="/mymatchesall">
          <button type="button">
            Click here to find people with similar taste
          </button>
        </Link>
      </div>
    </div>
  );
}
