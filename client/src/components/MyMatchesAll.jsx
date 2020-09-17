import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { dataBase, userData } = useContext(MyContext);

  useEffect(() => {
    if (dataBase[0]) {
      console.log(dataBase[1].userGenres);
      console.log(dataBase[0].userTracks);

      let sameArtists = dataBase[0].userTracks.filter((value) =>
        dataBase[1].userTracks.includes(value)
      );
      console.log(sameArtists);

      let allMyGenres = []
      dataBase[1].userGenres.map((item)=>{
        allMyGenres.push(...item)
      })
      let allMarcelGenres = []
      dataBase[0].userGenres.map((item)=>{
        allMarcelGenres.push(...item)
      })
let sameGenres = allMyGenres.filter((value)=>allMarcelGenres.includes(value))

console.log(sameGenres)

let unique = [...new Set(sameGenres)]
console.log(unique)


    }
  }, [dataBase]);

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
            <li>
              <h4>Number 1</h4>
              <img
                className="list-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt="avatar"
              />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
