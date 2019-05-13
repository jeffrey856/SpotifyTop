import React , { Component } from 'react';

// Content is coming from App.js
export class TabPane extends Component {
    render() {
        return (
            <div className='tabContent'>
            {this.props.children}
            </div>
        );
    }
}

export class Tabs extends Component {
  constructor(){
      super();
      this.state = {
          activeTabIndex: 0
      }
  }
  render() {
  const { children } = this.props;
      return (
      <div>
          <nav>
          {/*the parameter el is our array entity, i a the index of the Iteration (starting at 0)*/}
          {children.map((el,i) => <button key={i} onClick={() => this.setState({activeTabIndex: i})}>{el.props.title}</button>)}
          </nav>
      </div>
      );
  }
}