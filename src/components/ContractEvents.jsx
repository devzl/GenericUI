import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

@inject("FilesStore", "WebStore")
@observer
class ContractEvents extends Component {

  render() {

    const { FilesStore } = this.props;
    const { WebStore } = this.props;

    const contractsList = FilesStore.contractEvents[FilesStore.currentlySelectedContract] 
                        && FilesStore.contractEvents[FilesStore.currentlySelectedContract][WebStore.currentNetID]
                        && FilesStore.contractEvents[FilesStore.currentlySelectedContract][WebStore.currentNetID].map((theEvent) => {
                            return <li className="list-group-item" key={theEvent.transactionHash}>{theEvent.event}</li>;
                        })

    const emptyList = <li className="list-group-item">None</li>

    // TODO: Better and cleaner display of events
    return (
    	<div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <div className="card-header">
                    Emitted events
                </div>
                <ul className="list-group list-group-flush">
                    {FilesStore.contractEvents[FilesStore.currentlySelectedContract] 
                        && FilesStore.contractEvents[FilesStore.currentlySelectedContract][WebStore.currentNetID]
                        && (FilesStore.contractEvents[FilesStore.currentlySelectedContract][WebStore.currentNetID].length > 0) ? contractsList : emptyList}
                </ul>
            </div>
        </div>
    );
  }
}

export default ContractEvents;