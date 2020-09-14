import React, { useContext } from "react";
import Logo from "../assets/Spotify_Logo_RGB_Green.png"
import MyContext from "../MyContext";

export default function Home() {
  const { data, setData, fetchDataFromSpotify, loggedIn } = useContext(
    MyContext
  );

  return (
    <div className="main">
      <div className="content">
      <h3>Welcome to</h3>
      <h1>Mix & Match</h1>
      <a href="http://localhost:8888">
        <h3>Please login using your</h3>
        <img className="logo" src={Logo} alt="Spotify Logo" />
  
        <p>to find your real music Buddy!</p>
      </a>
      </div>
    </div>
  );
}
