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
                    {/* Look into the warning later */}
                    {/* make sure no other type than event, function, fallback, constructor are added later to solidity */}
                    {typeof FilesStore.currentlySelectedContractInfos !== "undefined" && FilesStore.currentlySelectedContractInfos.abi.filter(SMinfo => SMinfo.type !== "event").map((SMinfo) => {
                        return (
                            <ASingleFunction key="SMinfo.generatedId" SMinfo={SMinfo} idCurrentSM={FilesStore.currentlySelectedContractInfos.generatedId} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default ContractFunctions;