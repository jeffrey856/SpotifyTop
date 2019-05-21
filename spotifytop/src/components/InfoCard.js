import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';



const spotifyApi = new SpotifyWebApi();


export class InfoCard extends Component{
  constructor(){
		super();

		this.state = {
      related_art: [{name: 'NONE'}]
    };
  }
    componentDidMount(){
      Promise.all([
       spotifyApi.getArtistRelatedArtists(this.props.info.id)
      ])
  
  
  
      .then(([info]) => {
        this.setState({
          related_art: info
        })
      })
    }
	
  render(){
    const {info} = this.props
    const{related_art} = this.state
    console.log(related_art)
    return(
      <div >
        <h1>{info.name}</h1>
        
        <a 
        href = {info.external_urls.spotify}           
        target="_blank"
        >
          {info.name}'s Profile
        </a>  

        <p>Genre: {info.genres[0]}</p>
        <p>Followers: {info.followers.total} </p>


        {/* {related_art.map((d, index) => {
            return(
             
                <div key={index}>
                  <h1>{d.artists.name}</h1>
                </div>
              
            )}  
          )}   */}
      </div>
)
  }
}