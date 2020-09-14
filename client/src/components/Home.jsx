import React, { useContext } from "react";
import MyContext from "../MyContext";

export default function Home() {
  const { userData, userTop } = useContext(
    MyContext
  );
 /*  console.log(userData)
  console.log(userTop)
 */
  return (
    <div>
      <div>
        <a href="http://localhost:8888"> Login to Spotify </a>
      </div>
     {/*  {loggedIn && (
        <div>
          <button onClick={() => fetchDataFromSpotify()}>
            Fetch Data From Spotify
          </button>
        </div>
      )} */}
    </div>
  );
}
