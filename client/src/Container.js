import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MyContext from "./MyContext";
const spotifyApi = new SpotifyWebApi();

export default function Container(props) {
  const [data, setData] = useState([]);
  // loggedIn: this.token ? true : false,
  const [loggedIn, setLoggedIn] = useState(false);

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const params = getHashParams();
  const token = params.access_token;
  console.log(params, token);

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
      setLoggedIn(true);
    }
  }, [token]);

  const fetchDataFromSpotify = () => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=5",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((response) => {
      response.json().then((data) => {
        setData(data);
        console.log(data);
      });
    });
  };

  return (
    <MyContext.Provider
      value={{ data, setData, fetchDataFromSpotify, loggedIn }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
