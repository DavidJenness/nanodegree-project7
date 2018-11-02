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

  //This is called when a marker is clicked on screen
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
      .catch(error => alert("There was a problem accessing FourSquare's API. Please try again later"))
  }

  //This is called each time a character is typed in the search bar
  handleChange = event => {
    this.setState(
      { searchText: event.target.value },
      this.filterLocations(event)
    );
  };

  //This filters all of the locations down to ones that match the pattern typed in the search box
  filterLocations(event) {
    var myFilter = this.props.locations;
    myFilter = myFilter.filter(function (item) {
      return item.name.toLowerCase().search(event.target.value) !== -1;
    });
    this.setState({ filteredLocations: myFilter });
    this.updateMarkers(myFilter)
  }

  //Handles the click of the item in the sidebar
  makeListItemActive = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open })
    this.onMarkerClick(this.state.markerProps[index], this.state.markers[index])
  }

  //Loads when the map is ready to display
  mapReady = (props, map) => {
    this.setState({
      map
    });
    this.updateMarkers(this.state.filteredLocations)
  }

  //Closes the InfoWindow above the markers
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

  //Loads your markers into an array and the descriptions of the markers into an array
  updateMarkers = (filteredLocations) => {
    if (!filteredLocations) return;
    this.state.markers.forEach(marker => marker.setMap(null));
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
        {/* Added Semantic Element */}
          <aside className="sidebar">   
            Enter your Search
            <form>
              <input
                type="text" //ARIA Support
                aria-label="Search Textbox" //ARIA Support
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </form>
            <p />
            {/* Look at each of the filtered items and show them in the sidebar */}
            {this.state.filteredLocations.map((myLocation, index) => (
              <div className="listItem" key={index}>
                <button
                  className="list-item-header"
                  type="button" //ARIA Support
                  tabIndex="0"
                  onClick={e => this.makeListItemActive(index)}
                  value={JSON.stringify(myLocation)}
                >
                  {myLocation.name}
                </button>
                <div className="listCuisine">{myLocation.cuisine}</div>
                <hr />
              </div>
            ))}
          </aside>
          {/* Added Semantic Element */}
          <section className="map" ref="map">
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
          </section>
        </div>
      </div>
    );
  }
}

// This loads the Google Maps functionality
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  LoadingContainer: LoadingScreen
})(MapDisplay);

