import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import {pointsOfInterest} from './data/sampleData'


class App extends Component {

constructor() {
  super();
  this.state = {
    markers: []
    
  }
}



  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        </header> */}


<Map locations={pointsOfInterest}/>


        
      </div>
    );
  }
}

export default App;
