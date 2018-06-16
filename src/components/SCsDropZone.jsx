import React, { Component } from "react";

import shortid  from "shortid";

import Dropzone from "react-dropzone";

import { inject, observer } from "mobx-react";

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// wrapper around console.log
function cls(itemToLog) {
  console.log(itemToLog);
}

@inject("FilesStore", "WebStore")
@observer
class SCsDropZone extends Component {
    

    readJSONFile(f) {
        const { FilesStore } = this.props;

        const generatedId = shortid.generate()

        // keeping track of added files to support new versions later
        f.generatedId = generatedId
        FilesStore.addFile(f)

        // Adding web3 capabilities
        const { WebStore } = this.props;

        const reader = new FileReader();

        reader.onload = () => {
            var p = JSON.parse(reader.result);
            cls(p)
        }

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");

        // reads the file
        reader.readAsBinaryString(f);
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