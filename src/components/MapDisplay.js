import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Information } from "./Information";

export class MapDisplay extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 33.056146,
          lng: -97.065747
        }}
        onClick={this.onMapClicked}
      >
        {this.props.locations.map(marker => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            key={marker.uniqueID}
            onClick={this.onMarkerClick}
            name={marker.name}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <Information selectedPlace={this.state.selectedPlace}/>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapDisplay);
