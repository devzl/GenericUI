import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// to debug mobx vars
const mobx = require("mobx");

// Display a list of the selected smart contract's functions
@inject("FilesStore", "WebStore")
@observer
class ASingleFunction extends Component {

    coreDisplay (SMinfo, idCurrentSM) {        
        console.log(mobx.toJS(SMinfo)) 

        if (SMinfo.type === "function") {
            if (SMinfo.stateMutability === "pure") {

            } else if (SMinfo.stateMutability === "view") {

            } else if (SMinfo.stateMutability === "nonpayable") {

            } else if (SMinfo.stateMutability === "payable") {

            } else {
                console.log('A new stateMutability was added, should look into the Solidity docs and add it.')
            }
        } else if (SMinfo.type === "constructor") {

        } else if (SMinfo.type === "fallback") {

        } else {
            console.log('A new type was added, should look into the Solidity docs and add it.')
        }
    }

    render() {
        const { FilesStore } = this.props;
        const { WebStore } = this.props;

        const SMinfo = this.props.SMinfo;
        const idCurrentSM = this.props.idCurrentSM;

        // TODO: Better and cleaner display of list
        return (
        	<span className="list-group-item align-items-center">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{SMinfo.name}</h5>
                    <small className="text-muted">{SMinfo.stateMutability} - {SMinfo.type}</small>
                </div>
                <div>
                {this.coreDisplay(SMinfo, idCurrentSM)}
                </div>
            </span>
        );
    }
}

export default ASingleFunction;