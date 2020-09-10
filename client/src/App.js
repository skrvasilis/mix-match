import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    this.state={
      data:null
    }
    const params = this.getHashParams();
    this.token = params.access_token;
    console.log(params,this.token)
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
    }
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }
fetchDataFromSpotify=()=>{
  fetch('https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then((response) => {
                console.log(response.json().then(
                    (data) => {this.setState({data:data}); console.log(data) }
                ));
            });
}
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
       
          <div><button onClick={() => this.fetchDataFromSpotify()}>
            Fetch Data From Spotify
          </button>
          {this.state.data?<div>
            <h2>Artist Name: {this.state.data.name} </h2>
          <h3>Popularity: {this.state.data.popularity}</h3>
          {this.state.data.images.map(img=>{
            return (
              <img src={img.url} width={img.width}/>
            )
          })}
          </div>:null}
          </div>
        
          
        }
      </div>
    );
  }
}

export default App;
