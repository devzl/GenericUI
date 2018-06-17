import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Display a list of the added smart contracts
@inject("FilesStore")
@observer
class ContractsList extends Component {

  render() {

    const { FilesStore } = this.props;

    const contractsList = FilesStore.smartContractInfos.map((SM) => {
                            return <li className="list-group-item" key={SM.generatedId}>{SM.contractName}</li>;
                        })

    const emptyList = <li className="list-group-item">None</li>

    // TODO: Better and cleaner display of list
    return (
    	<div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <div className="card-header">
                    Smart contracts
                </div>
                <ul className="list-group list-group-flush">
                    {(FilesStore.smartContractInfos.length > 0) ? contractsList : emptyList}
                </ul>
            </div>
        </div>
    );
  }
}

export default ContractsList;