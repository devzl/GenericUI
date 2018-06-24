/**
* Extracts inputs and outputs of a function and manages them
*/

import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import FunctionInput from "./FunctionInput";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// to debug mobx vars
const mobx = require("mobx");

// Display a list of the selected smart contract's functions
@inject("FilesStore", "WebStore")
@observer
class ASingleFunction extends Component {

    /*constructor(props) {
        super(props);
        this.handleInputModification = this.handleInputModification.bind(this);
    }

    handleInputModification (newValue, functionId, inputIndex) {

    }*/

    // displaying the function
    functionDisplay (SMinfo, idCurrentSM) {  
        console.log('Here:')      
        console.log(mobx.toJS(SMinfo))

        for (var i = 0; i < SMinfo.inputs.length; i++) {
            return (
                <FunctionInput inputInfos={SMinfo.inputs[i]}
                functionId={SMinfo.generatedId}
                inputIndex={i} />
            );
        } 

        if (SMinfo.type === "function") {
            if (SMinfo.stateMutability === "pure") {

            } else if (SMinfo.stateMutability === "view") {

            } else if (SMinfo.stateMutability === "nonpayable") {

            } else if (SMinfo.stateMutability === "payable") {

            } else {
                console.log('A new stateMutability was added, should look into the Solidity docs and add it.')
            }
        } else if (SMinfo.type === "constructor") {
            // TODO see whether to keep 
        } else if (SMinfo.type === "fallback") {

        } else {
            console.log('A new type was added, should look into the Solidity docs and add it.')
        }
    }

    render() {
        // SM means Smart contract
        const { FilesStore } = this.props;
        const { WebStore } = this.props;

        const SMinfo = this.props.SMinfo;
        const idCurrentSM = this.props.idCurrentSM;

        // TODO: Better and cleaner display of list
        return (
        	<span className="list-group-item align-items-center">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{SMinfo.name}</h5>
                    <small className="text-muted">{SMinfo.stateMutability} - {SMinfo.type}</small>
                </div>
                <div>
                {this.functionDisplay(SMinfo, idCurrentSM)}
                </div>
            </span>
        );
    }
}

export default ASingleFunction;