import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Information } from "./Information";
// import ListItem from "./ListItem";

export class MapDisplay extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    filteredLocations: this.props.locations,
    searchText: "",
    syncItemID: {},
//From Tutorial
map: null,
    markers: [],
    markerProps: [],
    activeMarkerProps: null
  };

  // onMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true,
  //     syncItemID: marker.uniqueID
  //   });

  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();
    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props})
  }


  // onMapClicked = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  handleChange = event => {
    this.setState(
      { searchText: event.target.value },
      this.filterLocations(event)
    );
  };

  filterLocations(event) {
    var myFilter = this.props.locations;
    myFilter = myFilter.filter(function(item) {
      return item.name.toLowerCase().search(event.target.value) !== -1;
    });
    this.setState({ filteredLocations: myFilter });
  }

  handleButtonClick = function(event) {
    alert("I was clicked");
    let strLoc = JSON.parse(event.target.value);
    console.log(strLoc);
    this.setState({
      filteredLocations: this.state.filteredLocations.filter(item => {
        return item.uniqueID === strLoc.uniqueID;
      })
    });
  };

  //From Tutorial

  mapReady = (props, map) => {
    console.log("Map Ready");
    this.setState({
      map
    });
    this.updateMarkers(this.props.locations)
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

updateMarkers = (locations) => {
  if (!locations) return;
console.log("updating markers");
  this
    .state
    .markers
    .forEach(marker => marker.setMap(null));

  let markerProps = [];
  let markers = locations.map((location, index) => {
    let mProps = {
      key: index,
      index,
      name: location.name,
      position: {"lat": parseFloat(location.lat), "lng": parseFloat(location.lng)}
    };
    markerProps.push(mProps);

    let animation = this.props.google.maps.Animation.DROP;
    let marker = new this.props.google.maps.Marker({
      position: {"lat": parseFloat(location.lat), "lng": parseFloat(location.lng)},
      map: this.state.map,
      animation
    });

    marker.addListener('click', () => {
      this.onMarkerClick(mProps, marker, null);
    });

    return marker;

  })
  this.setState({markers, markerProps})
}

  render() {

    let myProps = this.state.activeMarkerProps;
    console.log("myProps = " + myProps)
    return (
      <div>
        <div className="pageContainer">
          <div className="sidebar">
            Enter your Search
            <form>
              <input
                type="text"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </form>
            {this.state.filteredLocations.map((myLocation, index) => (
              <div className="listItem" key={index}>
                <button
                  className="list-item-header"
                  type="button"
                  onClick={this.handleButtonClick.bind(this)}
                  value={JSON.stringify(myLocation)}
                >
                  {myLocation.name}
                </button>
                <p>{myLocation.cuisine}</p>

                {(() => {
                  if (this.state.syncItemID === myLocation.uniqueID) {
                    return <p>Selected Item</p>;
                  }
                })()}
                <hr />
              </div>
            ))}
          </div>

          <div className="map" ref="map">
            <Map
              google={this.props.google}
              onReady={this.mapReady}
              initialCenter={{
                lat: 33.056146,
                lng: -97.065747
              }}
              onClick={this.closeInfoWindow}
            >
              {/* {this.state.filteredLocations.map(marker => (
                <Marker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={marker.name}
                  key={marker.uniqueID}
                  onClick={this.onMarkerClick}
                  name={marker.name}
                  cuisine={marker.cuisine}
                  uniqueID={marker.uniqueID}
                />
              ))} */}

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.closeInfoWindow}
              >
                <div>
                  <h3>{myProps && myProps.name}</h3>
                  {/* <Information selectedPlace={myProps} /> */}
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
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapDisplay);
