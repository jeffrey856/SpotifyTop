import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../carousel.css';

import Grid from '@material-ui/core/Grid';
import {LineChar} from './Linechart';
import {InfoCard} from './InfoCard'



export class Caro extends Component {
  render(){  

  return(
      <Grid item xs zeroMinWidth  >
          <div>
              {this.props.title}
              {this.props.children}
          </div>
        </Grid>
    )
  }
}


export class CaroContentArt extends Component{
  
  render() {
    
    const { title, children } = this.props;
    console.log(children)
    return(  
      
     <div>
       <h1>{title}</h1>
      <Carousel
      transitionTime={350}  
      showIndicators={false}
      showThumbs={false}
      showStatus={false} 
      >
        {children.map((d, index) => {
            return(
              <Grid container spacing={24} key = {index}>
                
                <Grid item xs={4}>
                  <div >
                    <img src = {d.images[0].url}/>
                  </div>
                </Grid>
                  
                <Grid item xs={8} className="Card">

                  <InfoCard 
                      info = {d}
                  />
                </Grid>
              </Grid>
            )}  
          )}
       </Carousel>
    </div>
    )
  }
}

export class CaroContentSongs extends Component{
   render() {  
    const { title, children } = this.props;
    console.log(children)
    return(  
      
     <div>
       <h1>{title}</h1>
      <Carousel
      transitionTime={350}  
      showIndicators={false}
      showThumbs={false}
      showStatus={false} 
      
      emulateTouch
      >
        {children.map((d, index) => {
            return(
              <div key = {index}>
                <Grid container spacing={24}>
                  <Grid item xs={4}>
                    <img src = {d.album.images[0].url}/>
                    <p key = {index}>{d.name} - {d.artists[0].name}</p>
                  </Grid>
                  <Grid item xs={4}>
                    <LineChar 
                      trackProp = {d.id}
                    />
                  </Grid>
                </Grid>

              </div>
            )}  
          )}

       </Carousel>
    </div>
    )
  }
}
