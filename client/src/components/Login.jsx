import React from "react";  
import Logo from "../assets/Spotify_Logo_RGB_Green.png"

export default function Login() {
  return (
    <div className="login">
      <h1>Welcome to the whatever APP</h1>

      <a href="http://localhost:8888">
        <h3>Please login using your Spotify account</h3>
        <img className="App-logo" src={Logo} alt="Spotify Logo"/>
      </a>
    </div>
  );
}
