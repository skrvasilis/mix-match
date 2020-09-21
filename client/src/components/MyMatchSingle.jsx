import React, { useContext, useEffect, useState } from "react";
import MyContext from "../MyContext";

export default function MyMatchSingle() {
  const [filteredArtistMatch, setFilteredArtistMatch] = useState([]);
  const [genresToShow, setGenresToShow] = useState([]);
  const [otherUserImage, setOtherUserImage] = useState("");
  const [userLink, setUserLink] = useState("")
  const {
    genresSorted,
    artistsSorted,
    selectedUser,
    usersTop20,
    userImage,
    dataBase
  } = useContext(MyContext);

  useEffect(() => {
    if (selectedUser) {
      let currentGenres = genresSorted.filter(
        (item) => item.userName === selectedUser
      );
      currentGenres.map((item) => {
        let otherUserImage = item.userImage
          ? item.userImage
          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
        setOtherUserImage(otherUserImage);
      });

      let onlyGenres = [];
      for (let i = 0; i < 5; i++) {
        onlyGenres.push(currentGenres[0].sameGenres[i]);
      }

      setGenresToShow(onlyGenres);

      dataBase.map((item)=> {
        if (item.userName === selectedUser) {
          setUserLink(item.userLink)
        } 
      })


      // Artists sorted

      let currentArtists = artistsSorted.filter(
        (item) => item.userName === selectedUser
      );
      let onlyArtists = [];
      currentArtists[0].sameArtists.map((item) => {
        onlyArtists.push(item);
      });
      console.log(onlyArtists);
      let filtered = usersTop20.items.filter((item) =>
        onlyArtists.includes(item.name)
      );
      setFilteredArtistMatch(filtered);
    }
  }, [selectedUser, genresSorted, artistsSorted, dataBase, usersTop20]);
  
  console.log(userLink)
  

  return (
    <div className="main">
      <div className="content">
        <h1>You and {selectedUser}</h1>
        <img className="avatar" src={userImage && userImage} alt="avatar" />
        <img
          className="avatar"
          src={otherUserImage && otherUserImage}
          alt="avatar"
        />

        {filteredArtistMatch.length === 0 ? (
          <h3>Sorry you don't have any Artist matching</h3>
        ) : (
          <ul className="results">
            <h3>The same artists you both like</h3>

            {filteredArtistMatch &&
              filteredArtistMatch.map((item) => {
                return (
                  <li className="result">
                    <h4>{item.name}</h4>
                    <img
                      className="list-avatar"
                      src={item.images[2].url}
                      alt="avatar"
                    />
                  </li>
                );
              })}
          </ul>
        )}

        {genresToShow.length === 0 ? (
          <h3>Sorry you don't have any Gernres matching</h3>
        ) : (
          <ul className="results">
            <h3>The top genres you both like</h3>
            {genresToShow &&
              genresToShow.map((item) => {
                return (
                  <li className="result">
                    <h4>{item}</h4>
                  </li>
                );
              })}
          </ul>
        )}
        <a href={userLink}>
       
          <button type="button">
            Click here to to visit {selectedUser} Spotify page
          </button>
        </a>
       
      </div>
    </div>
  );
}
