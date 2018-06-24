import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class FunctionInput extends Component {
  render() {

  	const inputInfos = this.props.inputInfos;

    return (
        <div className="form-group row">
		    <label htmlFor="exampleFormControlInput1" className="col-sm-4 col-form-label"><span className="text-info">{inputInfos.type}</span> - {inputInfos.name}</label>
		    <div className="col-sm-8">
		    	<input type="text" className="form-control" placeholder="" />
		    </div>
		</div>
    );
  }
}

export default FunctionInput;