import React, { Component } from "react";
import "./App.css";
import { pointsOfInterest } from "./data/sampleData";
import MapDisplay from "./components/MapDisplay";

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        </header> */}

        <MapDisplay google={this.props.google} locations={pointsOfInterest} />
      </div>
    );
  }
}

export default App;
