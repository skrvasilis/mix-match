import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MyContext from "./MyContext";
const spotifyApi = new SpotifyWebApi();

export default function Container(props) {
  const [accesToken, setAccessToken] = useLocalStorage("userAccesTokenKey"); //accesToken saved to local storage
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useLocalStorage("userData", []); //fetched data from Spotify
  const [userImage, setUserImage] = useState("");
  const [currentUserId, setCurrentUserId] = useLocalStorage("currentUserId"); //Current logged in // userID saved to localstorage

  const [dataBase, setDataBase] = useState([]); //fetched data from db.json

  const [usersTop20, setUsersTop20] = useLocalStorage("usersTop20", []); //Users top 20 artists. Not from database, it's from fetching put to localStorage

  const [myTop5FromSpotifyFetch, setMyTop5FromSpotifyFetch] = useLocalStorage(
    "currentUserTop5FromSpotifyFetch",
    []
  ); // current users TOP 5 Artist from Spotify fetch to localstorage

  const [myTop20FromSpotifyFetch, setMyTop20FromSpotifyFetch] = useLocalStorage(
    "currentUserTop20FromSpotifyFetch",
    []
  ); // current users TOP 20 Artist from Spotify Fetch to localstorage

  const [myTop20ArtistNames, SetMyTop20ArtistNames] = useLocalStorage(
    "currentUserTop20ArtistNames",
    []
  ); // current users TOP 20 Artist NAMES only to localstorage

  const [
    myAllGenresFromSpotifyFetch,
    SetMyAllGenresFromSpotifyFetch,
  ] = useLocalStorage("currentUserAllGenresFromSpotifyFetch", []);

  const [myTop5FromDatabase, setMyTop5FromDatabase] = useLocalStorage(
    "currentUserTop5",
    []
  ); // current users TOP 5 Artist from database to localstorage

  const [genresSorted, setGenresSorted] = useLocalStorage("similarGenre", []);
  const [selectedUser, setSelectedUser] = useLocalStorage("selectedUser");
  const [artistsSorted, setArtistsSorted] = useLocalStorage(
    "similarArtist",
    []
  );

  const [currentDataBase, setCurrentDataBase] = useState([]);

  const [savedData, setSavedData] = useState([]); // this is the data what we prepare to save to database

  // json-server --watch db.json --port 5000

  // Use localstorage HOOK

  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  ////

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
      setAccessToken(token);
      setLoggedIn(true);
    }
  }, [token]);

  //we fetch our local db.json database
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, 'getdata')
        if (data.length>0) {
          setDataBase(data);
        }
      });
  }, [loggedIn]);

  //We fetch ME data from Spotify
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesToken,
      },
    }).then((response) => {
      response.json().then((userData) => {
        setUserData(userData); // set userData to userData
        console.log(userData)
      });
    });
  }, [loggedIn]);

  //We set current user into localstorage, so we know who is logged in
  useEffect(() => {
    setCurrentUserId(userData.display_name);
  }, [loggedIn]);

  //We fetch top artist data from Spotify

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20&offset=5",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accesToken,
        },
      }
    ).then((response) => {
      response.json().then((data) => {
        setUsersTop20(data); // set the top 20 artists data from fetching the current users to usersTop20 state (not Database)
      });
    });
  }, [loggedIn]);

  useEffect(() => {
    if (usersTop20.items) {
      setMyTop5FromSpotifyFetch(usersTop20.items.slice(0, 5));
      setMyTop20FromSpotifyFetch(usersTop20.items);
    }
  }, [loggedIn]);

  //This is all genres from fetched saving to localstorage
  useEffect(() => {
    let allGengresCurrentUser = [];
    let uniq = [];
    if (usersTop20.items) {
      // we set user's top Genres to topGenres

      usersTop20.items.map((item) => {
        allGengresCurrentUser.push(...item.genres);
      });
      uniq = [...new Set(allGengresCurrentUser)];
      SetMyAllGenresFromSpotifyFetch(uniq);
    }
  }, [usersTop20]);

  //This is all genres from fetched saving to localstorage
  useEffect(() => {
    let myTop20ArtistNames = [];
    if (myTop20FromSpotifyFetch) {
      myTop20FromSpotifyFetch.map((item) => {
        myTop20ArtistNames.push(item.name);
        SetMyTop20ArtistNames(myTop20ArtistNames);
      });
    }
  }, [loggedIn]);

  // we set the data that we want to post to the data base to savedData

  useEffect(() => {
    console.log(savedData.length, 'dtalength')
       
      console.log('run')
      setSavedData([
        {
          userName: userData.display_name,
          userID: userData.id,
          userImage: userData.images,
          userLink: userData.external_urls,
          userTracks: myTop20ArtistNames,
          userGenres: myAllGenresFromSpotifyFetch,
        },
      ]);
  }, [myAllGenresFromSpotifyFetch]);

  console.log(userData.external_urls)

  // code for myMatchesAll

  useEffect(() => {
    if (userData.images) {
      setUserImage(
        userData.images[0]
          ? userData.images[0].url
          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      );
    }
  }, [loggedIn, accesToken, usersTop20, userData]);

  useEffect(() => {
    if (dataBase.length > 0 && currentUserId) {
      // here we exclude the current user from the database
      setCurrentDataBase(
        dataBase.filter((item) => item.userName !== currentUserId)
      );
    }
  }, [loggedIn, accesToken, dataBase, currentUserId]);

  // make objects with the users from the database

  useEffect(() => {
    if (dataBase.length > 0 && currentDataBase.length > 0) {
      // i get the same artists
      let sameArtists = [];
      currentDataBase.map((item) => {
        sameArtists.push({
          userName: item.userName,
          sameArtists:item.userTracks && item.userTracks.filter((value) =>
            myTop20ArtistNames.includes(value)
          ),
        });
      });
      let tempArtists =sameArtists && sameArtists.sort(
        (a, b) => b.length - a.length
      );
      setArtistsSorted(tempArtists);
    }
  }, [myTop20ArtistNames]);

  //  Here new filter for genres::
  useEffect(() => {
    if (dataBase.length > 0 && currentDataBase.length > 0) {
      // i get the same genres
      let sameGenres = [];
      currentDataBase.map((item) => {
        sameGenres.push({
          userName: item.userName,
          userImage: item.userImage && item.userImage[0] ? item.userImage[0].url : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          sameGenres:item.userGenres && item.userGenres.filter((value) =>
            myAllGenresFromSpotifyFetch.includes(value)
          ),
        });
      });
      let tempGenre =sameGenres && sameGenres.sort(
        (a, b) => b.length - a.length
      );
      setGenresSorted(tempGenre);
    }
  }, [myAllGenresFromSpotifyFetch]); 

  
  return (
    <MyContext.Provider
      value={{
        accesToken,
        userData,
        userImage,
        usersTop20,
        savedData,
        dataBase,
        genresSorted,
        artistsSorted,
        selectedUser,
        setSelectedUser,
        currentUserId,
        myTop5FromSpotifyFetch,
        myTop5FromDatabase,
        myAllGenresFromSpotifyFetch,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
