import {Line} from 'react-chartjs-2';
import React,{ Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
		}
	}
	componentDidMount(){
		Promise.all([
			spotifyApi.getAudioAnalysisForTrack(this.props.trackProp)
		])
		.then((features) => {
			this.setState({
				pitches: features[0].segments
			})
		})
	}
	
  render() {
		const {pitches} = this.state
		console.log(pitches)
		const { trackProp } = this.props;
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} />
      </div>
    );
  }
};