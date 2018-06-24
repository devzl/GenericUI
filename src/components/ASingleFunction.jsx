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

    // displaying the function
    functionDisplay (FunctionInfo, idCurrentSM) {  
        console.log('Function info:')      
        console.log(mobx.toJS(FunctionInfo))

        if(FunctionInfo.inputs.length <= 0) {
            this.executeInputlessFunction(FunctionInfo, idCurrentSM)
        } else {
            let inputs = []
            for (var i = 0; i < FunctionInfo.inputs.length; i++) {
                inputs.push(
                    <FunctionInput inputInfos={FunctionInfo.inputs[i]}
                    functionId={FunctionInfo.generatedId}
                    inputIndex={i}
                    idCurrentSM = {idCurrentSM} key={i} />
                );
            }

            return inputs
        }
         

        if (FunctionInfo.type === "function") {
            if (FunctionInfo.stateMutability === "pure") {

            } else if (FunctionInfo.stateMutability === "view") {

            } else if (FunctionInfo.stateMutability === "nonpayable") {

            } else if (FunctionInfo.stateMutability === "payable") {

            } else {
                console.log('A new stateMutability was added, should look into the Solidity docs and add it.')
            }
        } else if (FunctionInfo.type === "constructor") {
            // TODO see whether to keep 
        } else if (FunctionInfo.type === "fallback") {

        } else {
            console.log('A new type was added, should look into the Solidity docs and add it.')
        }
    }

    executeInputlessFunction (FunctionInfo, idCurrentSM) {
        const { FilesStore } = this.props;

        FilesStore.web3Instances.find((SM) => SM.generatedId === idCurrentSM).methods[FunctionInfo.name]().call(function(error, result){
          if(error) {
            console.log(error)
          } else {
            console.log(result)
          }
        });
    }

    render() {
        // SM means Smart contract
        const { FilesStore } = this.props;

        const FunctionInfo = this.props.FunctionInfo;
        const idCurrentSM = this.props.idCurrentSM;

        // TODO: Better and cleaner display of list
        return (
        	<span className="list-group-item align-items-center">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{FunctionInfo.name}</h5>
                    <small className="text-muted">{FunctionInfo.stateMutability} - {FunctionInfo.type}</small>
                </div>
                <div>
                {this.functionDisplay(FunctionInfo, idCurrentSM)}
                </div>
            </span>
        );
    }
}

export default ASingleFunction;