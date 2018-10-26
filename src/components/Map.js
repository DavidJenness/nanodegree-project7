import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import Listing from "./Listing";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 33.056146, lng: -97.065747 }}
    >
      {props.locations.map(marker => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.name}
          key={marker.uniqueID}
          onClick={() => console.log(marker.uniqueID)}
        >
          <InfoWindow key={marker.name} visible={true}>
            <div>{marker.name}</div>
          </InfoWindow>
        </Marker>
      ))}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    let myURL =
      "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_GOOGLE_API_KEY;
    return (
      <MyMapComponent
        isMarkerShown
        locations={this.props.locations}
        googleMapURL={myURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: window.innerHeight }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
