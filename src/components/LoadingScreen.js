import React, { Component } from "react";

class LoadingScreen extends Component {
    render = () => {
        return (
            <div>
                <p>Loading the Map. If you do not see the map after a few moments, </p>
                <p>it means the the Google Maps API is experiencing an issue.</p>
                <p>You should wait a few minutes and try again.</p>
            </div>
        )
    }
}
export default LoadingScreen;