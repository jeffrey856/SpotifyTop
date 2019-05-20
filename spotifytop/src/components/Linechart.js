import {Line} from 'react-chartjs-2';
import React,{ Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import * as math from 'mathjs'



const spotifyApi = new SpotifyWebApi();





export class LineChar extends Component{
	constructor(){
		super();

		this.state = {
     
        labels: ['init'],
        datasets: [
          {
            label: 'Loudness',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#1DB954',
            borderColor: '#1DB954',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#1DB954',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#1DB954',
            pointHoverBorderColor: '#1DB954',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0,0,0]
          }
        ]
      
		}
	}
	componentDidMount(){
		Promise.all([
			spotifyApi.getAudioAnalysisForTrack(this.props.trackProp)
    ])
    
    

		.then((features) => {
      var oldDataSet = this.state;
      var pitches = [];
      var time = [];
      for (var x = 0; x< features[0].segments.length; x +=5){
        pitches.push(math.mean(features[0].segments[x].loudness_max).toFixed(2))
      }

      for (var x = 0; x< features[0].segments.length; x+=5){
         time.push((features[0].segments[x].start / 60).toFixed(2))
      }

      var newDataSet = {
        ...oldDataSet
      };

      newDataSet.datasets[0].data = pitches
      newDataSet.labels = time

			this.setState(newDataSet)
		
		})
  }
  

	
  render() {
    
    // console.log(this.state)    
    return (
      <div>
        <h2>Loudness (db) </h2>
        <Line data ={this.state} />
      </div>
    );
  }
};