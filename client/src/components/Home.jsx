import React, { useContext } from "react";
import Logo from "../assets/Spotify_Logo_RGB_Green.png"
import MyContext from "../MyContext";

export default function Home() {
  const { userData, userTop } = useContext(
    MyContext
  );
 /*  console.log(userData)
  console.log(userTop)
 */
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
<<<<<<< HEAD
     {/*  {loggedIn && (
        <div>
          <button onClick={() => fetchDataFromSpotify()}>
            Fetch Data From Spotify
          </button>
        </div>
      )} */}
=======
>>>>>>> 6d64585d47f3ea336ee847286d6f2e84f9bfda8b
    </div>
  );
}
