import React, { Component } from "react";

import shortid  from "shortid";

import Dropzone from "react-dropzone";

import { inject, observer } from "mobx-react";

import truffleContract from "truffle-contract";

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
    
    listenToEvents (contractGeneratedID) {
        const { FilesStore } = this.props;
        const { WebStore } = this.props;

        // retrieve a truffle instance of the smart contract by ID
        const theContract = FilesStore.truffleInstances.find((tc) => tc.generatedId === contractGeneratedID)
        
        theContract.deployed().then((instance) => {

            const allEvents = instance.allEvents({
                fromBlock: 0,
                toBlock: 'latest'
            });

            allEvents.watch((err, theEvent) => {
                if(err) cls(err);
                else {
                    // save event
                    FilesStore.addToEventsArray(contractGeneratedID, WebStore.currentNetID, theEvent)

                    cls(mobx.toJS(FilesStore.contractEvents))
                }
            });
        })
        .catch(function(err) {
            console.log(err.message);
        });
            
    }

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
            // p, parsed JSON build file
            const p = JSON.parse(reader.result);

            let infos = {}

            infos.generatedId = generatedId
            infos.contractName = p.contractName
            infos.abi = p.abi
            infos.networks = p.networks

            FilesStore.addSMinfos(infos)

            // get network ID of the currently (single) running web3 instance
            const netID = WebStore.currentNetID

            // won't really change for now cause we use a single web3 instance
            WebStore.setCurrentNetID(netID)

            // map the contract to the net ID (for now network supposed running and smart contract deployed to)
            var contractWithWeb3 = new WebStore.web3.eth.Contract(infos.abi, infos.networks[netID]["address"]);

            contractWithWeb3.generatedId = generatedId

            FilesStore.addWeb3InstanceOfASmartContract(contractWithWeb3)

            // truffle contract
            let tc = truffleContract(p)

            tc.setProvider(WebStore.web3.currentProvider)

            tc.generatedId = generatedId

            FilesStore.addTruffleInstanceOfASmartContract(tc)

            // create array of events for the smartcontract/on netID
            FilesStore.createEventsArray(generatedId, netID)

            // Starting to listen to events
            this.listenToEvents(generatedId)

            // select currently set up contract if none is set
            FilesStore.selectContractIfNoneSet(generatedId)

            
        }

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");

        // reads the file
        reader.readAsBinaryString(f);
    }

    render() {
        return (
            <div className="col-md-3">
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