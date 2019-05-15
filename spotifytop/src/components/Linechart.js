import {Line} from 'react-chartjs-2';
import React,{ Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


const data = {
  labels: ['Jan', 'Feb', 'March', 'April', 'March'],
  datasets: [
    {
      label: 'loudness',
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export class DoughnutExample extends Component{
	constructor(){
		super();

		this.state = {
      pitches: [],
      data : {
        labels: [],
        datasets: [
          {
            label: 'loudness',
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
            data: []
          }
        ]
      }
		}
	}
	componentDidMount(){
		Promise.all([
			spotifyApi.getAudioAnalysisForTrack(this.props.trackProp)
    ])
    
		.then((features) => {
      var data = this.state.data
      data.push(features[0].segments)
			this.setState({
        pitches: features[0].segments,
        data
        })
		
		})
	}
	
  render() {
    const {pitches} = this.state
    console.log(pitches)
    console.log(data)
    return (
      <div>
        <h2>Line Example</h2>
        <Line data ={data} />
      </div>
    );
  }
};