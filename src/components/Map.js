import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import Listing from "./Listing";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 33.056146, lng: -97.065747 }}
    >
        {props.isMarkerShown && <Marker title="Starwood" position={{ lat: 33.065145, lng: -97.080881 } } /> } 
        {props.isMarkerShown && <Marker title="Seven Mile Cafe" position={{ lat: 33.072347, lng: -97.059849 } } /> } 
        {props.isMarkerShown && <Marker title="Mi Dia from Scratch" position={{ lat: 33.047154, lng: -97.070295 } } /> } 
        {props.isMarkerShown && <Marker title="Frescos" position={{ lat: 33.073760, lng: -97.063936 } } /> } 
        {props.isMarkerShown && <Marker title="What's On Tap*" position={{ lat: 33.074307, lng: -97.068947 } } /> } 
        {props.isMarkerShown && <Marker title="Local Pint" position={{ lat: 33.033979, lng: -97.072304 } } /> } 

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
                containerElement={<div style={{ height: window.innerHeight }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        );
    }
}
