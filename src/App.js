import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './components/Map';


class App extends Component {

constructor() {
  super();
  this.state = {
    markers: []
  }
}



  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        </header> */}


<Map/>


        
      </div>
    );
  }
}

export default App;
