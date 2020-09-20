import React, { useContext, useEffect, useState } from "react";
import MyContext from "../MyContext";

export default function MyMatchSingle() {
  const [filteredArtistMatch, setFilteredArtistMatch] = useState([]);
  const [genresToShow, setGenresToShow] = useState([]);
  const [otherUserImage, setOtherUserImage] = useState("");
  const {
    genresSorted,
    artistsSorted,
    selectedUser,
    usersTop20,
    userImage,
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
      for (let i = 0; i < 10; i++) {
        onlyGenres.push(currentGenres[0].sameGenres[i]);
      }
      
      setGenresToShow(onlyGenres);

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
  }, [selectedUser, genresSorted, artistsSorted]);
  console.log(filteredArtistMatch);
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

        <ul className="results">
          <h4>The same Artists you like</h4>

          {filteredArtistMatch &&
            filteredArtistMatch.map((item) => {
              return (
                <li>
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

        <ul className="results">
          <h4>The same Genres you like</h4>
          {genresToShow &&
            genresToShow.map((item) => {
              return (
                <li>
                  <h4>{item}</h4>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
