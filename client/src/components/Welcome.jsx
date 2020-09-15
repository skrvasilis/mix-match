import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";
import { Link } from "react-router-dom";

export default function Welcome() {
  const{userData, userTop} = useContext(MyContext) 
  const [userImage, setImage] = useState('')
  const [top, setTop] = useState([]);
  let topArtists = []

  
if (userData) {
  console.log(userData.images)
}

useEffect(() => {
  setTop(userTop.items);
}, [userTop]);



if (top) {
  for (let i =0;i<5;i++) {
    topArtists.push(top[i])
  }
  console.log(topArtists)
}
 

  return (
    <div className="main">
      <div className="content">
        <h1> welcome {userData.display_name}</h1>
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
        />
        <h3>Now we know your music taste</h3>
        <ul className="results">
        <h4>Your top 5 Artists are:</h4>
          {top && topArtists.map((item)=>{
            return (
            <li>
            <h4>{item && item.name}</h4> 
             <img
               className="list-avatar"
               src={item && item.images[0].url}
               alt="avatar"
             />
           </li>
           )
          })}
          
         
        </ul>
        <ul className="results">
          <h4>Your top 5 music genres:</h4>
          <li>Genre 1</li>
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
