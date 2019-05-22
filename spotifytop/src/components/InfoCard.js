import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Carousel } from 'react-responsive-carousel';
import '../carousel.css';



const spotifyApi = new SpotifyWebApi();


export class InfoCard extends Component{
  constructor(){
		super();

		this.state = {
      related_art: []
    };
  }
    componentDidMount(){
      Promise.all([
       spotifyApi.getArtistRelatedArtists(this.props.info.id)
      ])
  
      .then(([info]) => {
        var oldDataSet = this.state;
        var relate = [];
        for (var x = 0; x< info.artists.length; x++){
          relate.push(info.artists[x])
        }
        
        var newDataSet = {
          ...oldDataSet
        };

        newDataSet.related_art = relate

        this.setState(newDataSet)
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


        <Carousel
        transitionTime={350}  
        showIndicators={false}
        showThumbs={false}
        showStatus={false} 
        
        emulateTouch
        >
        {related_art.map((d, index) => {
            return(
             
                <div key={index}>
                  <img src = {d.images[0].url}/>
                  <p>{d.name}</p>
                </div>
              
            )}  
          )}
          </Carousel>  
      </div>
)
  }
}