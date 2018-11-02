import React, { Component } from "react";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import LoadingScreen from "./LoadingScreen"
require('dotenv').config();

export class MapDisplay extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: null,
    filteredLocations: this.props.locations,
    searchText: "",
    likeSummary: null,
    map: null,
    markers: [],
    markerProps: [],
    activeMarkerProps: null
  };

  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();
    this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props })
    //Foursquare API 
    let url = 'https://api.foursquare.com/v2/venues/' + props.foursquareid + '/likes?client_id=' + process.env.REACT_APP_FOURSQUARE_CLIENTID + '&client_secret=' + process.env.REACT_APP_FOURSQUARE_CLIENTSECRET + '&v=20180323';
    let headers = new Headers();
    let request = new Request(url, { method: 'GET', headers });
    fetch(request)
      .then(response => response.json())
      .then(result => {
        this.setState({
          likeSummary: result.response.likes.summary
        })
        this.state.activeMarker.setAnimation(this.props.google.maps.Animation.BOUNCE)
      })
  }

  handleChange = event => {
    this.setState(
      { searchText: event.target.value },
      this.filterLocations(event)
    );
  };

  filterLocations(event) {
    var myFilter = this.props.locations;
    myFilter = myFilter.filter(function (item) {
      return item.name.toLowerCase().search(event.target.value) !== -1;
    });
    this.setState({ filteredLocations: myFilter });
    this.updateMarkers(myFilter)
  }

  makeListItemActive = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open })
    this.onMarkerClick(this.state.markerProps[index], this.state.markers[index])
  }

  mapReady = (props, map) => {
    this.setState({
      map
    });
    this.updateMarkers(this.state.filteredLocations)
  }

  closeInfoWindow = () => {
    this.state.activeMarker && this
      .state
      .activeMarker
      .setAnimation(null);
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    })
  }

  updateMarkers = (filteredLocations) => {
    if (!filteredLocations) return;
    this
      .state
      .markers
      .forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = filteredLocations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        foursquareid: location.foursquareid,
        position: { "lat": parseFloat(location.lat), "lng": parseFloat(location.lng) }
      };
      markerProps.push(mProps);

      let animation = null;
      let marker = new this.props.google.maps.Marker({
        position: { "lat": parseFloat(location.lat), "lng": parseFloat(location.lng) },
        map: this.state.map,
        animation
      });

      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null);
      });

      return marker;

    })
    this.setState({ markers, markerProps })
  }

  render() {

    let myProps = this.state.activeMarkerProps;
    return (
      <div>
        <div className="pageContainer">
          <div className="sidebar">
            Enter your Search
            <form>
              <input
                type="text" //ARIA Support
                aria-label="Search Textbox" //ARIA Support
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </form>
            {this.state.filteredLocations.map((myLocation, index) => (
              <div className="listItem" key={index}>
                <button 
                  className="list-item-header"
                  type="button" //ARIA Support
                  aria-label="Location Button" //ARIA Support
                  tabIndex="0"
                  onClick={e => this.makeListItemActive(index)}
                  value={JSON.stringify(myLocation)}
                >
                  {myLocation.name}
                </button>
                <p>{myLocation.cuisine}</p>
                <hr />
              </div>
            ))}
          </div>

          <div className="map" ref="map">
            <Map
              role="application" //ARIA Support
              aria-label="map" //ARIA Support
              google={this.props.google}
              onReady={this.mapReady}
              initialCenter={{
                lat: 33.056146,
                lng: -97.065747
              }}
              onClick={this.closeInfoWindow}
            >
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.closeInfoWindow}
              >
                <div>
                  <h3>{myProps && myProps.name}</h3>
                  <p>{this.state.likeSummary} on FourSquare</p>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  LoadingContainer: LoadingScreen
})(MapDisplay);

