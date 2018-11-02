import React, { Component } from "react";

//This is what will show as the Map is loading.
class LoadingScreen extends Component {
    render = () => {
        return (
            <div>
                <p>Loading the Map. Please be patient if you are on a slower connection.</p>
            </div>
        )
    }
}
export default LoadingScreen;