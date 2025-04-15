import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { findMatches } from '../helpers/apiCalls';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { authenticateUser } from "../helpers/apiCalls";
export default function Welcome() {
  const { userInfo, avatarUrl } = useContext(MyContext);
  const location = useLocation();
  const history = useHistory();

  const [top5artists, setTop5artists] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (userInfo.userArtists) {
      const fiveArtist = userInfo.userArtists.slice(0, 5);
      setTop5artists(fiveArtist);
    }
  }, [userInfo]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params)
    const token = params.get("token");
    console.log("Token" , token)
    if (token) {
      localStorage.setItem("token", token); // or sessionStorage.setItem
      history.replace("/welcome"); // remove token from URL
    }

    const fetchUser = async () => {
      try {
        const data = await authenticateUser(token);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  //To display only Firstname:
  const completeName =
    String(userInfo.userName)[0].toUpperCase() + String(userInfo.userName).substring(1);
  const displayFirstName = completeName.replace(/ .*/, '');

  setTimeout(function () {
    setLoader(true);
  }, 200);

  if (loader === false) {
    return (
      <div className='main'>
        <div className='content'>
          <section>
            <Loader type='Oval' color='#ff00ff' height={100} width={100} timeout={300} />
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div className='main'>
        <div className='content'>
          <h1>Welcome {displayFirstName + '!'}</h1>
          {userInfo && userInfo.avatar === null ? (
            <object
              alt='avatar-placeholder'
              type='image/svg+xml'
              data={avatarUrl}
              className='avatar'
            ></object>
          ) : (
            <img className='avatar' src={userInfo && userInfo.avatar} alt='avatar' />
          )}
          <h2>Now we know your music taste</h2>
          <ul className='results'>
            <h3>Your top 5 artists are:</h3>
            {top5artists &&
              top5artists.map((item) => {
                return (
                  <li key={item._id} className='result'>
                    <h4>{item && item.artistName}</h4>
                    <img
                      className='list-avatar'
                      src={item && item.artistAvatar}
                      alt='avatar'
                    />
                  </li>
                );
              })}
          </ul>
          <ul className='results'>
            <h3>Your top 5 music genres:</h3>
            {userInfo.userGenres &&
              userInfo.userGenres.slice(0, 5).map((item) => {
                return (
                  <li key={item._id} className='result'>
                    <h4>{item.genre}</h4>
                  </li>
                );
              })}
          </ul>
          <Link to='/mymatchesall'>
            <button type='button'>Click here to find people with similar taste</button>
          </Link>
        </div>
      </div>
    );
  }
}
