import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import ASingleFunction from './ASingleFunction';

// Display a list of the selected smart contract's functions
@inject("FilesStore")
@observer
class ContractFunctions extends Component {

  render() {

    const { FilesStore } = this.props;

    // TODO: Better and cleaner display of functions list
    return (
    	<div className="col-md-7">
            <div className="card mb-7 box-shadow">
                <div className="card-header">
                    Functions
                </div>
                <div className="list-group">
                    {/* TODO - Generate IDs for each abi line*/}
                    {typeof FilesStore.currentlySelectedContractInfos !== "undefined" && FilesStore.currentlySelectedContractInfos.abi.map((SMinfo, index) => {
                        return <ASingleFunction key="index" />
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default ContractFunctions;