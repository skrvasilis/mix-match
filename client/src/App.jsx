import React from "react";
import "./App.css";
import Container from './Container'
import Home from './Home'



function App() {
 

  /*   const params = this.getHashParams();
    this.token = params.access_token;
    console.log(params, this.token);
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
    }
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
 */
 /*  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
        },
      });
    });
  } */
  /* fetchDataFromSpotify = () => {
    fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=5", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      console.log(
        response.json().then((data) => {
          this.setState({ data: data });
          console.log(data);
        })
      );
    });
  };







  render() {
    if (this.state.data) {
      console.log(this.state);
    } */
    return (
     
        <Container>
        <Home/>
        </Container>
    
    );
  }


export default App;
