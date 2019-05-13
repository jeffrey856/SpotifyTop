import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';

export class Caro extends Component {
  render(){  
  return(

      <Grid item xs zeroMinWidth  >
          <div>
            <h1>top artists: </h1>
            <Carousel
                transitionTime={350}  
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                centerMode centerSlidePercentage={30} emulateTouch
                >
              {this.props.content}
            </Carousel>
          </div>
        </Grid>
    )
  }
}

export class CaroContent extends Component{
  render() {
    const { content } = this.props;
    return(  
      <div>
      {content.map(function(d, index){
          return(
            <div>
              <img src = {d.images[0].url}/>
              <p key = {index}>{d.name}</p>
            </div>
          )
        })}
      </div>
    )
    }
}