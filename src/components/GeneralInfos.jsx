/**
* Shows general infos about the node
*/

import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

@inject("FilesStore", "WebStore")
@observer
class GeneralInfos extends Component {

  render() {

    const { FilesStore } = this.props;
    const { WebStore } = this.props;

    const selectedContract = <li className="list-group-item">Currently selected smart contract: {typeof FilesStore.currentlySelectedContractInfos !== "undefined" && FilesStore.currentlySelectedContractInfos.contractName}</li>

    const networkId = <li className="list-group-item">Current network: {WebStore.currentNetID}</li>

    // TODO: Better and cleaner display of the infos
    return (
    	<div className="col-md-5">
            <div className="card mb-5 box-shadow">
                <div className="card-header">
                    General infos
                </div>
                <ul className="list-group list-group-flush">
                    {networkId}
                    {typeof FilesStore.currentlySelectedContractInfos !== "undefined" && selectedContract}
                </ul>
            </div>
        </div>
    );
  }
}

export default GeneralInfos;