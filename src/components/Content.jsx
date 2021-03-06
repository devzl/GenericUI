/**
* Manages the components shown on the front page
*/

import React, { Component } from "react";

// Compenents imports
import SCsDropZone from './SCsDropZone.jsx';
import ContractsList from './ContractsList';
import GeneralInfos from './GeneralInfos';
import ContractEvents from './ContractEvents';
import ContractFunctions from './ContractFunctions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class Content extends Component {

  render() {
    return (
    	<main role="main">
    		<div className="py-5 bg-light">
    			<div className="container-fluid">
    				<div className="row">
    					<SCsDropZone />
    					<ContractsList />
    					<GeneralInfos />
    				</div>
    				<div className="row">
    					<ContractFunctions />
    					<ContractEvents />
    				</div>
    			</div>
    		</div>
    	</main>
    );
  }
}

export default Content;