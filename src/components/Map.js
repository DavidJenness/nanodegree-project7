import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Listing from "./Listing";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 33.044569, lng: -97.044676 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.lat), lng: -97.044676 }} />}
        {console.log(props.lat)}
    </GoogleMap>
))


export default class Map extends Component {

    render() {
        let myURL = ("https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + process.env.REACT_APP_GOOGLE_API_KEY);
        return (
            <MyMapComponent
                isMarkerShown
                lat={this.props.lat}
                googleMapURL={myURL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: window.innerHeight }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        );
    }
}
