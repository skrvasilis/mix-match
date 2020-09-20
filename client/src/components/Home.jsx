import React, { useContext } from "react";
import Logo from "../assets/Spotify_Logo_RGB_Green.png";
import MyContext from "../MyContext";

export default function Home() {
  const { userData, userTop } = useContext(MyContext);
  /*  console.log(userData)
  console.log(userTop)
 */
  return (
    <div className="main">
      <div className="content">
        <h2>Welcome to</h2>
        <h1>Mix & Match</h1>
        <div className="container">
          <a className="login-button" href="http://localhost:8888/login">
            <h3>Please login using your</h3>
            <img className="logo" src={Logo} alt="Spotify Logo" />
            <h3>to find your real music Buddy!</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
