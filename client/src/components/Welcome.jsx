import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { userData, userTop, savedData, setSavedData } = useContext(MyContext);

  const [top, setTop] = useState([]);
  let topArtists = [];
  let topGenres = [];
  let genresFinal = [];
  const allArtists = [];

  useEffect(() => {
    setTop(userTop.items);
    console.log(allArtists);
  }, [userTop]);

  if (top) {
    for (let i = 0; i < 5; i++) {
      topArtists.push(top[i]);
    }

    top.map((item) => {
      allArtists.push(item.name);
    });

    top.map((item) => {
      topGenres.push(item.genres);
    });

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
    console.log(sortable);

    for (let i = 0; i < 5; i++) {
      topFiveGenres.push(sortable[i]);
    }

    for (let i = 0; i < topFiveGenres.length; i++) {
      genresFinal = genresFinal.concat(topFiveGenres[i]);
    }
    genresFinal = genresFinal.filter((x) => isNaN(x));
  }

  useEffect(() => {
    setSavedData(...savedData, {
      userName: userData.display_name,
      userImage: userData.images,
      userTracks: allArtists,
      userGenres: topGenres,
    });
  }, [top]);
  const completeName =
    String(userData.display_name)[0].toUpperCase() +
    String(userData.display_name).substring(1);
  const displayFirstName = completeName.replace(/ .*/, "");
  return (
    <div className="main">
      <div className="content">
        <h1>Welcome {displayFirstName + "!"}</h1>
        <img
          className="avatar"
          src={
            userData.images === 0
              ? userData.images[0].url
              : " https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt="avatar"
        />
        <h3>Now we know your music taste</h3>
        <ul className="results">
          <h4>Your top 5 Artists are:</h4>
          {top &&
            topArtists.map((item) => {
              return (
                <li>
                  <h4>{item && item.name}</h4>
                  <img
                    className="list-avatar"
                    src={item && item.images[0].url}
                    alt="avatar"
                  />
                </li>
              );
            })}
        </ul>
        <ul className="results">
          <h4>Your top 5 music genres:</h4>
          {top &&
            genresFinal.map((item) => {
              return <li><h4>{item}</h4></li>;
            })}
        </ul>
        <Link to="/mymatchesall">
          <button type="button">
            Click here to find people with similar taste
          </button>
        </Link>
      </div>
    </div>
  );
}
