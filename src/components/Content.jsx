import React, { Component } from "react";

// Compenents imports
import SCsDropZone from './SCsDropZone.jsx';

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
    				</div>
    			</div>
    		</div>
    	</main>
    );
  }
}

export default Content;