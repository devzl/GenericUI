import React, { PureComponent } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class Navbar extends PureComponent {

  render() {
    return (
       <header>
	      <div className="collapse bg-main-color" id="navbarHeader">
	        <div className="container">
	          <div className="row">
	            <div className="col-sm-8 col-md-7 py-4">
	              <h4 className="text-white">About</h4>
	              <p className="text-white">Generic UI for ethereum smart contracts.</p>
	            </div>
	            <div className="col-sm-4 offset-md-1 py-4">
	              <h4 className="text-white">Links</h4>
	              <ul className="list-unstyled">
	                <li><a href="https://github.com/devzl/GenericUI" className="text-white">Github</a></li>
	              </ul>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div className="navbar navbar-dark bg-main-color box-shadow">
	        <div className="container d-flex justify-content-between">
	          <a href="#" className="navbar-brand d-flex align-items-center">
	            <strong>GenericUI</strong>
	          </a>
	          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
	            <span className="navbar-toggler-icon"></span>
	          </button>
	        </div>
	      </div>
	    </header> 
    );
  }
}

export default Navbar;