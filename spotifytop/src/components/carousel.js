import React, { Component } from 'react';
mport { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';

class Caro extends Component{
  render(){
    return(
      <Grid item xs zeroMinWidth  >
          <div>
            <h1>top Med Term artists: </h1>
            <Carousel
                transitionTime={350}  
                showIndicators={false}
                showThumbs={false}
                showStatus={false} useKeyboardArrows
                centerMode centerSlidePercentage={30} emulateTouch
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
    )
  }
}


export default Caro;