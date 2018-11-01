import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Information } from "./Information";
// import ListItem from "./ListItem";

export class MapDisplay extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    filteredLocations: this.props.locations,
    searchText: "",
    syncItemID: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      syncItemID: marker.uniqueID
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
    //alert("I was clicked");
    let strLoc = JSON.parse(event.target.value);
    console.log(this.state.filteredLocations);
    this.setState({
      filteredLocations: this.state.filteredLocations.filter(item => {
        return item.uniqueID === strLoc.uniqueID;
      })
    });
  };

  render() {
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
              // <ListItem myLocation={myLocation} key={index} syncItemID={this.state.syncItemID}/>
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
              initialCenter={{
                lat: 33.056146,
                lng: -97.065747
              }}
              onClick={this.onMapClicked}
            >
              {this.state.filteredLocations.map(marker => (
                <Marker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={marker.name}
                  key={marker.uniqueID}
                  onClick={this.onMarkerClick}
                  name={marker.name}
                  cuisine={marker.cuisine}
                  uniqueID={marker.uniqueID}
                />
              ))}

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <Information selectedPlace={this.state.selectedPlace} />
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
