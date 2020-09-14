import React from "react";  
import Logo from "../assets/Spotify_Logo_RGB_Green.png"

export default function Login() {
  return (
    <div className="login">
      <h3>Welcome to</h3>
      <h1>Mix & Match</h1>
      
      <a href="http://localhost:8888">
        <h3>Please login using your</h3>
        <img className="App-logo" src={Logo} alt="Spotify Logo"/>
        <h3>account</h3>
      </a>
      <p>to find your true music Buddy.</p>
    </div>
  );
}
