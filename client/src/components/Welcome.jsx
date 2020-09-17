import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";

export default function Welcome() {
  const {
    userData,
    userTop,
    savedData,
    setSavedData,
    topGenres,
    allArtists,
    topArtists,
    genresFinal
  } = useContext(MyContext);

 

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
          src={
            userData.images ===0 ? userData.images[0].url
              : " https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt="avatar"
        />
        <h3>Now we know your music taste</h3>
        <ul className="results">
          <h4>Your top 5 Artists are:</h4>
          {topArtists &&
            topArtists.map((item) => {
              return (
                <li>
                  <h4>{item && item.name}</h4>
                  <img
                    className="list-avatar"
                     src={item && item.images[0].url}
                    alt="avatar"
                  />
                </li>
              );
            })}
        </ul>
        <ul className="results">
          <h4>Your top 5 music genres:</h4>
          {genresFinal &&
            genresFinal.map((item) => {
              return (
                <li>
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
