import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 33.044569, lng: -97.044676 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 33.044569, lng: -97.044676 }} />}
    </GoogleMap>
))


export default class Map extends Component {

    render() {
        let myURL = ("https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + process.env.REACT_APP_GOOGLE_API_KEY);
        return (
            <MyMapComponent
                isMarkerShown
                googleMapURL={myURL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `800px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        );
    }
}
