import React , {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
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
        names: ['Hello User'],
        tracks: ['Please LogIn']
      },
    }
  };

  componentDidMount(){
    Promise.all([spotifyApi.getMyTopArtists(), spotifyApi.getMyTopTracks()])

    .then(([artists, songs]) => {
      this.setState({
        serverData: {
          names: artists.items ,
          tracks: songs.items
        }
      })
    });
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
    const {names, tracks} = this.state.serverData
    console.log(names)
    console.log(tracks)
    return (
      <div className="App">
        <header className="App-header">
         
          <a
            className="App-link"
            href="http://localhost:8888"
            rel="noopener noreferrer"
          >
           Sign in to Spotify
          </a>
       
        <div>
          { this.state.loggedIn &&
            <button onClick = {() => this.getList()} >
                GET LIST
            </button>
           
          }
        </div>
        
        <div>
          <h1>top artists: </h1>
          {names.map(function(d, index){
            return(
              <div>
                <li key = {index}>{d.name}</li>
              </div>
            )
          })}
        </div>

        <div>
          <h1>top tracks: </h1>
          {tracks.map(function(d, index){
            return(
              <div>
                <li key = {index}>{d.name}</li>
              </div>
            )
          })}
        </div>
        
        </header>
      </div>
    );
  }
  
}

export default App;
