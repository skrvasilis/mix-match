import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default function MyMatch() {
  const { dataBase,userData,topGenres, allArtists} = useContext(MyContext);
  useEffect(() => {
    console.log(topGenres)
    console.log(allArtists)
    if (dataBase[0]) {
  let current= dataBase.filter((item)=>item.userName!==userData.display_name)
console.log(current)
    

      let sameArtists =[]
      for (const item of current) {
         sameArtists.push((item.userTracks.filter((value)=>allArtists.includes(value))))
      }
      console.log(sameArtists)

    
      let sameGenres =[]
      let currentGenres = []
      topGenres.map((item)=>{
        currentGenres.push(...item)
      })
      console.log(currentGenres)
    let otherGenres = []
      for (const item of current) {
      item.userGenres.map((value)=>otherGenres.push(...value))
      }
console.log(otherGenres)
for (const item of current) {
   sameGenres.push((currentGenres.filter((value)=>otherGenres.includes(value))))
}

 
console.log(sameGenres)


let unique = []
for (const item of sameGenres)
 unique.push([...new Set(item)])
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
