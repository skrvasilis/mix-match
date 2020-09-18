import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MyContext from "./MyContext";
const spotifyApi = new SpotifyWebApi();

export default function Container(props) {
  const [userData, setUserData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [dataBase, setDataBase] = useState([]); //use localstorage
  const [userTop, setUserTop] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [allArtists, setAllArtist] = useState([]);
  const [genresFinal, setGenresFinal] = useState([]);
  const [accesToken, setAccessToken] = useLocalStorage("userAccesTokenKey",); //accesToken saved to local storage

  const[genresSorted, setGenresSorted] = useState([])
  const[selectedUser, setSelectedUser] = useState('')
  const[artistsSorted, setArtistsSorted]=useState([])

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
  const setValue = value => {
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
  console.log(token)
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
      });
    });
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
        setUserTop(data); // set the topartists data from the user to UserTop
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


    if (savedData.length > 0 /* && !dataBase.includes(userData.display_name) */) {
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
  }, [loggedIn]);

  

  useEffect(() => {
    if (userTop.items) {
      console.log(userTop.items.slice(0, 5));
      setTopArtists(userTop.items.slice(0, 5)); // we take the first 5 artists so we can dislay them in welcome page

      // we set all 20 top artists to AllArtists 
      let artistData = userTop.items.map((item) => {
        return item.name;
      });
      setAllArtist(artistData);

      // we set user's top Genres to topGenres 
      let genresData = userTop.items.map((item) => {
        return item.genres;
      });
      setTopGenres(genresData);
      console.log(topGenres);

      // we set top 5 genres to genresFinal

      // first we find the similar genres
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
// we sort the genres from bigest to lowest 
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });

      sortable.reverse();

      // we take the first 5 genres 
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

  // we set the data that we want to post to the data base to savedData
    useEffect(() => {
    if (topGenres.length > 0 /*  && !dataBase.includes(userData.display_name ) */ ) {
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
  }, [userData]);  



  // code for myMatchesAll 

  useEffect(() => {
    if (dataBase[0] && userData) {
      // here we exclude the current user from the database
      let currentDataBase = dataBase.filter(
        (item) => item.userName !== userData.display_name
      );
      console.log(currentDataBase);
      console.log(allArtists);

      // make objects with the users from the database

      // i get the same artists 
      let sameArtists = [];

      currentDataBase.map((item) => {
        sameArtists.push({
          userName: item.userName,
          sameArtists: item.userTracks.filter((value) =>
            allArtists.includes(value)
          ),
        });
      });
      console.log(sameArtists)
      // sort from the biggest
      let tempArtists = sameArtists.sort((a,b)=> b.sameArtists.length-a.sameArtists.length)
     
      
      setArtistsSorted(tempArtists)

      console.log(artistsSorted)
      



      // here i get an array with all the genres the current user has
      let currentGenres = [];
      topGenres.map((item) => {
        currentGenres.push(...item);
      });
      console.log(currentGenres);

      // here i get n arrays with the genres that the others users have
      let otherGenres = [];
      currentDataBase.map((item) => {
        otherGenres.push([...item.userGenres]);
      });

      // here i get the same genres 
      let sameGenres = [];
      for (const item of otherGenres) {
        item.join().split(",");
        sameGenres.push(
          item
            .join()
            .split(",")
            .filter((value) => currentGenres.includes(value))
        );
      }

      // here we delete duplicates
      let uniqueGenres = [];
      for (const item of sameGenres) {
        uniqueGenres.push([...new Set(item)]);
      }
      console.log(uniqueGenres);

      for (const item of uniqueGenres) {
        console.log(currentDataBase[uniqueGenres.indexOf(item)].userName);
      }

      
      let finalSameGenres = [];
      for (const item of uniqueGenres) {
        finalSameGenres.push({
          userName: currentDataBase[uniqueGenres.indexOf(item)].userName,
          sameGenres: item,
        });
      }

      console.log(finalSameGenres)
    

// we sort the users from the biggest
     let test = finalSameGenres.sort((a,b)=> b.sameGenres.length-a.sameGenres.length)
     setGenresSorted(test)

    }
  }, [userData]);

  if (genresSorted) {
    console.log(genresSorted)
  }

useEffect(()=>{
    if (selectedUser) {
      console.log(selectedUser)
      
    }

  },[selectedUser])



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
        genresSorted,
        artistsSorted,
        selectedUser,
        setSelectedUser
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
