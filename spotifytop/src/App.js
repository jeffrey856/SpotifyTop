import React , {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Grid from '@material-ui/core/Grid';

import { Tabs, TabPane } from './components/nav';
import {Caro, CaroContentArt, CaroContentSongs} from './components/carousel';

import './carousel.css';
import './App.css';

const spotifyApi = new SpotifyWebApi();


class App extends Component{
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      serverData : {
        user: ' New User Please LogIn',
        artists: [],
        reccs:  [],
        tracks: [],
        token: token
      },
    }
  };

  componentDidMount(){
    Promise.all([
      spotifyApi.getMe(),
      spotifyApi.getMyTopArtists({limit: 50}), 
      spotifyApi.getMyTopTracks({limit: 50}),
      spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_genres: ['hip-hop', 'pop', 'r&b'],
        limit: 50,
        min_popularity: 50
      })
    ])
    .then(([info, artists, songs, reccs]) => {
      this.setState({
        serverData: {
          user: info.display_name,
          artists: artists.items,
          tracks: songs.items,
          reccs: reccs.tracks
        }
      })
    })
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

  render(){
    const {user, artists, tracks, reccs} = this.state.serverData
    
    console.log(user)
    console.log(tracks)
    console.log(this.state)
    if(this.state.loggedIn){
    return (
      <div className="App">
        <Tabs>
                <TabPane title='Tab 1'>Content 1</TabPane>
                <TabPane title='Tab 2'>Content 2</TabPane>
                <TabPane title='Tab 3'>Content 3</TabPane>
            </Tabs>      
        <header className="App-header">
        
        <div>
          Welcome {user}
        </div>  
        
        <Caro>
          <CaroContentArt
            title = {'top artists'}
            children = {artists}
          />
        </Caro>
      
        <Caro>
          <CaroContentSongs
            title = {'top Songs'}
            children = {tracks}
          />
        </Caro>

        <Caro>
          <CaroContentSongs
            title = {'reccomendations'}
            children = {reccs}
          />
        </Caro>

        </header>
      </div>
    );
  } else{
    return(
      <div className="App-header">

        <div>
          Welcome {user}
        </div>
        
        <a
          class = 'signInButton'
          className="App-link"
          href="http://localhost:8888"
          rel="noopener noreferrer"
        >
        Sign in to Spotify 
        </a>

      </div>
      
    );
  
  }
}
  
}

export default App;