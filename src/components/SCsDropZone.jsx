import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Dropzone from "react-dropzone";

class SCsDropZone extends Component {

  render() {
    return (
    	

        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <div className="card-body">
                    <div className="dropzone">
                        <Dropzone>
                        <p>
                        Drop your smart contract's .json file here
                        </p>
                        </Dropzone>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default SCsDropZone;