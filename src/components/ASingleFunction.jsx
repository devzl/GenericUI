import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Display a list of the selected smart contract's functions
@inject("FilesStore", "WebStore")
@observer
class ASingleFunction extends Component {

  render() {

    const { FilesStore } = this.props;
    const { WebStore } = this.props;

    // TODO: Better and cleaner display of list
    return (
    	<span className="list-group-item d-flex justify-content-between align-items-center">
        </span>
    );
  }
}

export default ASingleFunction;