import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MyContext from "./MyContext";
const spotifyApi = new SpotifyWebApi();

export default function Container(props) {
  const [userData, setUserData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedData, setSavedData]= useState({});
  const [allData, setAllData] = useState(null)

  const [userTop, setUserTop] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:5000/posts').then(resp=>resp.json()).then(data=>{
      setAllData(data)
    })
    console.log(allData)
  },[])

  useEffect(()=>{
    fetch('http://localhost:5000/savedData', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "savedData": {savedData}
  })
})
  },[savedData])

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

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      response.json().then((userData) => {
        setUserData(userData);
        console.log(userData);
      });
    });
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20&offset=5",
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
        setUserTop(data);
        console.log(userTop);
      });
    });
  }, [loggedIn]);
 
  return (
    <MyContext.Provider value={{ userData, userTop ,savedData, setSavedData}}>
      {props.children}
    </MyContext.Provider>
  );
}
