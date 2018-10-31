import React, { Component } from 'react';
import './App.css';
import Map2 from './components/Map2';
import {pointsOfInterest} from './data/sampleData'
import MapDisplay from './components/MapDisplay'
import {GoogleApiWrapper} from 'google-maps-react';



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


{/* <Map2 locations={pointsOfInterest}/> */}
<MapDisplay google={this.props.google} locations={pointsOfInterest}/>

        
      </div>
    );
  }
}

export default App;
