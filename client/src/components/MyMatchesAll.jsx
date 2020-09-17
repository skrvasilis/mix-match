import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { dataBase, userData, topGenres, allArtists } = useContext(MyContext);
  const[genresSorted, setGenresSorted] = useState([])

  useEffect(() => {
    if (dataBase[0]) {
      // here we exclude the current user from the database
      let currentDataBase = dataBase.filter(
        (item) => item.userName !== userData.display_name
      );
      console.log(currentDataBase);

      // make objects with the users from the database

      // i get the same artists but i cannot combine the users
      let sameArtists = [];

      currentDataBase.map((item) => {
        sameArtists.push({
          userName: item.userName,
          sameArtists: item.userTracks.filter((value) =>
            allArtists.includes(value)
          ),
        });
      });

      // sort from the biggest
      let sameArtistSorted = sameArtists.sort((a,b)=> b.sameArtists.length-a.sameArtists.length)
      console.log(sameArtistSorted)
      



      // here i get an array with all the genres the current user has
      let currentGenres = [];
      topGenres.map((item) => {
        currentGenres.push(...item);
      });
      console.log(currentGenres);

      // here i get 2 arrays with the genres that the others users have
      let otherGenres = [];
      currentDataBase.map((item) => {
        otherGenres.push([...item.userGenres]);
      });

      // here i get the same artists but not the userName as well
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
      console.log(finalSameGenres);

    

// we sort the users from the biggest
     let test = finalSameGenres.sort((a,b)=> b.sameGenres.length-a.sameGenres.length)
     setGenresSorted(test)
console.log(genresSorted)

    }
  }, [dataBase]);
  if (genresSorted) {
    console.log(genresSorted)

  }

  return (
    <div className="main">
      <div className="content">
        <h1>{`Top 5 matches of ${userData && userData.display_name}`}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <ul className="results">
          <Link to="/mymatch">
              {genresSorted && genresSorted.map((item)=>{
                return (
                  <li>
                  <h4>{item.userName}</h4>
                  <img
                    className="list-avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    alt="avatar"
                  />
                </li>
                )
              })}
          </Link>
        </ul>
      </div>
    </div>
  );
}
