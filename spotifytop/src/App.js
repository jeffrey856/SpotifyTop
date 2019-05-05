import React , {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';

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
        namesShort: [],
        namesMed: [],
        namesLong: [],
        tracks: [],
      },
    }
  };

  componentDidMount(){
    Promise.all([spotifyApi.getMe(), 
      spotifyApi.getMyTopArtists({limit: 50, time_range: 'short_term'}), 
      spotifyApi.getMyTopArtists({limit: 50, time_range: 'medium_term'}), 
      spotifyApi.getMyTopArtists({limit: 50, time_range: 'long_term'}), 
      spotifyApi.getMyTopTracks({limit: 50})])

    .then(([info, artists_short, artists_med, artists_long, songs]) => {
      this.setState({
        serverData: {
          user: info.display_name,
          namesShort: artists_short.items ,
          namesMed: artists_med.items,
          namesLong: artists_long.items,
          tracks: songs.items
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
    const {user, namesShort,namesMed,namesLong, tracks} = this.state.serverData
    console.log(user)
    console.log(tracks)
    if(this.state.loggedIn){
    return (
      <div className="App">
        <header className="App-header">

        <div>
          Welcome {user}
        </div>
          
        
        
        <div>
          <h1>top Long Term artists: </h1>
          {namesLong.map(function(d, index){
            return(
              <div>
                <li key = {index}>{d.name}</li>
              </div>
            )
          })}
        </div>
        
        <Grid item xs zeroMinWidth  >
          <div>
            <h1>top Med Term artists: </h1>
            <Carousel
                transitionTime={350}  
                showIndicators={false}
                showThumbs={false}
                showStatus={false} useKeyboardArrows
                centerMode centerSlidePercentage={30}
                emulateTouch
                >
            {namesMed.map(function(d, index){
              return(
                <div>
                  <img src = {d.images[0].url}/>
                  <p key = {index}>{d.name}</p>
                </div>
              )
            })}
            </Carousel>
          </div>
        </Grid>

        <div>
          <h1>top Short Term artists: </h1>
          {namesShort.map(function(d, index){
            return(
              <div>
                <li key = {index}>{d.name}</li>
              </div>
            )
          })}
        </div>
        <Grid item xs zeroMinWidth  >
          <div>
            <h1>top tracks: </h1>
            <Carousel
              transitionTime={350}  
              showIndicators={false}
              showThumbs={false}
              showStatus={false} useKeyboardArrows
              centerMode centerSlidePercentage={40} emulateTouch
              >
              {tracks.map(function(d, index){
                return(
                  <div>
                    <img src = {d.album.images[0].url}/>
                    <p key = {index}>{d.name}</p>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </Grid>

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
