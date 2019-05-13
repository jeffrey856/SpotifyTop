import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import '../carousel.css';


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
      centerMode centerSlidePercentage={30}
      emulateTouch
      >
        {children.map((d, index) => {
            return(
              <div>
                <img src = {d.images[0].url}/>
                <p key = {index}>{d.name}</p>
              </div>
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
      centerMode centerSlidePercentage={30}
      emulateTouch
      >
        {children.map((d, index) => {
            return(
              <div>
                <img src = {d.album.images[0].url}/>
                <p key = {index}>{d.name}</p>
              </div>
            )}  
          )}
       </Carousel>
    </div>
    )
    }
}