import React, { Component } from "react";

import shortid  from "shortid";

import Dropzone from "react-dropzone";

import { inject, observer } from "mobx-react";

import contract from "truffle-contract";

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// to debug mobx vars
const mobx = require("mobx");


// wrapper around console.log
function cls(itemToLog) {
  console.log(itemToLog);
}

@inject("FilesStore", "WebStore")
@observer
class SCsDropZone extends Component {
    

    async readJSONFile(f) {
        const { FilesStore } = this.props;

        const generatedId = shortid.generate()

        // keeping track of added files to support new versions later
        f.generatedId = generatedId
        FilesStore.addFile(f)

        // Adding web3 capabilities
        const { WebStore } = this.props;

        const reader = new FileReader();

        reader.onload = async () => {
            const p = JSON.parse(reader.result);

            let infos = {}

            infos.generatedId = generatedId
            infos.contractName = p.contractName
            infos.abi = p.abi
            infos.networks = p.networks

            FilesStore.addSMinfos(infos)

            //cls(mobx.toJS(FilesStore.smartContractInfos))

            // get network ID of the currently (single) running web3 instance
            const netID = await WebStore.web3.eth.net.getId()

            // map the contract to the net ID (for now)
            var truffleInstanceOfTheContract = new WebStore.web3.eth.Contract(infos.abi, infos.networks[netID]["address"]);

            truffleInstanceOfTheContract.generatedId = generatedId

            FilesStore.addTruffleInstanceOfASmartContract(truffleInstanceOfTheContract)

            FilesStore.selectContractIfNoneSet(generatedId)

            cls(FilesStore.currentlySelectedContract)
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