import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MyContext from "./MyContext";
const spotifyApi = new SpotifyWebApi();

export default function Container(props) {
  const [userData, setUserData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [dataBase, setDataBase] = useState([]);
  const [userTop, setUserTop] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [allArtists, setAllArtist] = useState([]);
  const [genresFinal, setGenresFinal] = useState([]);

  useEffect(() => {
    if (savedData.length > 0) {
      console.log(savedData);
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(...savedData),
      });
    }
  }, [savedData]);

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

    fetch("http://localhost:5000/user")
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        setDataBase(data);
      }
    });
  }, [loggedIn]);

  

  useEffect(() => {
    if (userTop.items) {
      console.log(userTop.items.slice(0, 5));
      setTopArtists(userTop.items.slice(0, 5));

      let artistData = userTop.items.map((item) => {
        return item.name;
      });
      setAllArtist(artistData);

      let genresData = userTop.items.map((item) => {
        return item.genres;
      });
      setTopGenres(genresData);
      console.log(topGenres);

      let tmp = {};
      for (let i = 0; i < topGenres.length; i++) {
        for (let j = 0; j < topGenres[i].length; j++) {
          if (!tmp[topGenres[i][j]]) {
            tmp[topGenres[i][j]] = 0;
          }
          tmp[topGenres[i][j]]++;
        }
      }
      let topFiveGenres = [];
      let sortable = [];
      for (const genre in tmp) {
        sortable.push([genre, tmp[genre]]);
      }

      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });

      sortable.reverse();

      for (let i = 0; i < 5; i++) {
        topFiveGenres.push(sortable[i]);
      }

      let genresFinalData = [];
      for (let i = 0; i < topFiveGenres.length; i++) {
        genresFinalData = genresFinalData.concat(topFiveGenres[i]);
      }
      genresFinalData = genresFinalData.filter((x) => isNaN(x));
      setGenresFinal(genresFinalData);
    }
    
  }, [userTop]);

  /*  useEffect(() => {
    if (topGenres.length > 0 && !dataBase.includes(userData.display_name)) {
      setSavedData([
        {
          userName: userData.display_name,
          userImage: userData.images,
          userTracks: allArtists,
          userGenres: topGenres,
        },
      ]);
      console.log(savedData);
    }
  }, [userData]);  */

  return (
    <MyContext.Provider
      value={{
        userData,
        userTop,
        savedData,
        topGenres,
        allArtists,
        topArtists,
        genresFinal,
        dataBase,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
