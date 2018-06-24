/**
* Extracts inputs and outputs of a function and manages them
*/

import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import FunctionInput from "./FunctionInput";
import FunctionOutput from "./FunctionOutput";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// to debug mobx vars
const mobx = require("mobx");

// Display a list of the selected smart contract's functions
@inject("FilesStore", "WebStore")
@observer
class ASingleFunction extends Component {

    // displaying the function inputs
    functionDisplayInputs (FunctionInfo, idCurrentSM) {  
        console.log('Function info:')      
        console.log(mobx.toJS(FunctionInfo))

        if(FunctionInfo.inputs.length <= 0) {
            this.executeInputlessFunction(FunctionInfo, idCurrentSM)
        } else {
            let inputs = []
            for (var i = 0; i < FunctionInfo.inputs.length; i++) {
                inputs.push(
                    <FunctionInput 
                    inputInfos={FunctionInfo.inputs[i]}
                    functionId={FunctionInfo.generatedId}
                    inputIndex={i}
                    idCurrentSM = {idCurrentSM} 
                    key={i} />
                );
            }

            return inputs
        }
         
        /*
        // Useless for now
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
        }*/
    }

    functionDisplayOutputs (FunctionInfo, idCurrentSM) { 
        let outputs = []
        for (var i = 0; i < FunctionInfo.outputs.length; i++) {
            outputs.push(
                <FunctionOutput
                outputInfos={FunctionInfo.outputs[i]}
                functionId={FunctionInfo.generatedId}
                outputIndex={i}
                idCurrentSM = {idCurrentSM} 
                key={i} />
            );
        }

        return outputs
    }

    executeInputlessFunction (FunctionInfo, idCurrentSM) {
        const { FilesStore } = this.props;
        const { WebStore } = this.props;

        FilesStore.web3Instances.find((SM) => SM.generatedId === idCurrentSM).methods[FunctionInfo.name]().call(function(error, result){
            if(error) {
                console.log(error)
            } else {
                //console.log(result)
                
                if(typeof result === 'object') {
                    let counter = 0;
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            FilesStore.modifyCurrentOutputValueForFunctionOutput(result[key], FunctionInfo.generatedId, counter, idCurrentSM);
                            counter++;
                        }
                    }
                } else if (typeof result === 'string') {
                    FilesStore.modifyCurrentOutputValueForFunctionOutput(result, FunctionInfo.generatedId, 0, idCurrentSM);
                }

                // TODO check for big number
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
                <hr />
                <small>Inputs:</small>
                {this.functionDisplayInputs(FunctionInfo, idCurrentSM)}
                <hr />
                <small>Outputs:</small>
                {this.functionDisplayOutputs(FunctionInfo, idCurrentSM)}
                </div>
            </span>
        );
    }
}

export default ASingleFunction;