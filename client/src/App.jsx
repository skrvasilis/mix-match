import React, { Component } from "react";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
    const params = this.getHashParams();
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

  fetchDataFromSpotify = () => {
    fetch(
      "https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      }
    ).then((response) => {
      console.log(
        response.json().then((data) => {
          this.setState({ data: data });
          console.log(data);
        })
      );
    });
  };
  render() {
    console.log(spotifyApi);
    return (
      <div className="App">
        Fuck that shit
        <Login />
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <div>
            <button onClick={() => this.fetchDataFromSpotify()}>
              Fetch Data From Spotify
            </button>
            {this.state.data ? (
              <div>
                {/* <h2>Artist Name: {this.state.data.display_name} </h2>
          <h3>Popularity: {this.state.data.popularity}</h3>
          {this.state.data.images.map(img=>{
            return (
              <img src={img.url} width={img.width}/>
            )
          })} */}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
