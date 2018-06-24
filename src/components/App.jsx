/**
* Base component for the front page
*/

// modules imports
import React, { Component } from "react";

// Compenents imports
import Navbar from './Navbar.jsx';
import Content from './Content.jsx'

// css
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {

    return (
        <div>
          <Navbar />
          <Content />
        </div>
    );
  }
}

export default App;
