import React, { useContext, useEffect, useState } from "react";
import MyContext from "../MyContext";

export default function MyMatchSingle() {
  const { genresSorted, artistsSorted, selectedUser } = useContext(MyContext);
  const [artistsToShow, setArtistsToShow] = useState([])
const [genresToShow, setGenresToShow] = useState([])
  useEffect(() => {
    if (selectedUser) {
      console.log(genresSorted);
      console.log(artistsSorted);
      console.log(selectedUser);

     let  currentGenres = genresSorted.filter(
        (item) => item.userName === selectedUser
      );
      let onlyGenres = []
      for (let i=0;i<5;i++) {
        onlyGenres.push(currentGenres[0].sameGenres[i])
      }
      
      setGenresToShow(onlyGenres)
       

     let currentArtists = artistsSorted.filter(
        (item) => item.userName === selectedUser
      );
      let onlyArtists = []
      currentArtists[0].sameArtists.map((item)=>{
        onlyArtists.push(item)
      });
      setArtistsToShow(onlyArtists)
    }
  }, [selectedUser]);

  useEffect(()=>{
    console.log(genresToShow)
    console.log(artistsToShow)
  },[genresToShow])
  return (
    <div className="main">
      <div className="content">
        <h1>{`You and ${selectedUser}`}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />

        <ul className="results">
          <h4>The same Artists you like</h4>
          {artistsToShow && artistsToShow.map((item)=>{
            return (
<li>
                  <h4>{item}</h4>
                  <img
                    className="list-avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    alt="avatar"
                  />
                </li>
            )
          })}
        </ul>

        <ul className="results">
          <h4>The same Genres you like</h4>
          {genresToShow && genresToShow.map((item)=>{
            return (
              <li>
              <h4>{item}</h4>
            </li>
            )
          })}
         
        </ul>
      </div>
    </div>
  );
}
