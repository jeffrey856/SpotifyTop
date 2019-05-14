import React ,{Component} from 'react';


export class Welcome extends Component{
  render(){
    return(
      <div>
        <h1>{this.props.title}{this.props.user}</h1>
        

      </div>
    )
  }
}