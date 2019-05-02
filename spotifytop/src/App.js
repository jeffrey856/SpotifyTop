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
      serverData : {},
      string: 'None'
    }
  };

  getList(){
    spotifyApi.getMyTopArtists()
    .then((data) => {
      this.setState({
        serverData: {
          name: data.items
        }
      })
    console.log(this.state)
    }, function(err) {
      console.error(err);
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
    const data = this.state.serverData
    console.log(data)
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
         loggedIn 
        </div>

        </header>
      </div>
    );
  }
  
}

export default App;
