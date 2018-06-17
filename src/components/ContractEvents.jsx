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
                        && FilesStore.contractEvents[FilesStore.currentlySelectedContract][WebStore.currentNetID].slice().reverse().map((theEvent) => {
                            return (<li className="list-group-item" key={theEvent.transactionHash}>
                                        <em className="text-info">{theEvent.event}</em>
                                        <span className="text-muted"> - </span>
                                        <span className="text-warning">On block: {theEvent.blockNumber}</span>  
                                        <br />
                                        {
                                            Object.keys(theEvent.args).map((elem) => {
                                                return (
                                                    <span key="elem"><span className="text-muted">{elem}</span> : {theEvent.args[elem]}</span>)
                                                ;
                                            })
                                        }
                                    </li>);
                        })

    const emptyList = <li className="list-group-item">None</li>

    // TODO: Better and cleaner display of events
    return (
    	<div className="col-md-5">
            <div className="card mb-5 box-shadow">
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