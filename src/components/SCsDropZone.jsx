import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Dropzone from "react-dropzone";

// wrapper around console.log
function cls(itemToLog) {
  console.log(itemToLog);
}

class SCsDropZone extends Component {

    readJSONFile(f) {
        cls("file read");
        cls(f);
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <div className="card-body">
                        <div className="dropzone">
                            <Dropzone /* TODO style later*/
                                accept="application/json"
                                onDrop={(accepted, rejected) => {
                                    if(accepted.length > 0){this.readJSONFile(accepted[accepted.length - 1]);}
                                    if(rejected.length > 0){/* TODO show alert/info */}
                                }}>
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