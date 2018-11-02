import React, { Component } from "react";
import "./App.css";
import { pointsOfInterest } from "./data/sampleData";
import MapDisplay from "./components/MapDisplay";

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <MapDisplay google={this.props.google} locations={pointsOfInterest} />
      </div>
    );
  }
}

//Handle any Errors with the Google API and notify the user
//Taken from https://developers.google.com/maps/documentation/javascript/events#auth-errors 
window.gm_authFailure = () => {
  alert("There was a problem loading the Google Maps API. Double check your API Key and try again. The content will not render appropriately until this is resolved.")
}

//This code will handle unhandled promises
//Taken from https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection  
window.addEventListener("unhandledrejection", function (event) {
  alert("Unable to load a resource. Check your connection and try again.");
});

export default App;
