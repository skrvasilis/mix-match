import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/Spotify_Logo_RGB_Green.png';
import MyContext from '../MyContext';
import credentials from '../helpers/credentials';

export default function Home() {
  const { userInfo } = useContext(MyContext);

  if (userInfo.userName) {
    return <Redirect to='/welcome' />;
  }
  const url = `${credentials.serverUrl}/auth/spotify`;

  return (
    <div className='main'>
      <div className='content'>
        <h2>Welcome to</h2>
        <h1>Mix & Match</h1>
        <div className='container'>
          <a className='login-button' href={url}>
            <h3>Please login using your</h3>
            <img className='logo' src={Logo} alt='Spotify Logo' />
            <h3>to find your real music Buddy!</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
