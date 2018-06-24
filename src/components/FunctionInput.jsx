import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Display a list of the selected smart contract's functions
@inject("FilesStore")
@observer
class FunctionInput extends Component {

	handleChange = e => {
		const { FilesStore } = this.props;
        FilesStore.modifyCurrentInputValueForFunctionInput(e.target.value, this.props.functionId, this.props.inputIndex, this.props.idCurrentSM)
	}  

  	render() {

  		const inputInfos = this.props.inputInfos;

  		const { FilesStore } = this.props;
  		
  		const idCurrentSM = this.props.idCurrentSM;
  		const functionId = this.props.functionId;
  		const inputIndex = this.props.inputIndex;

	    return (
	        <div className="form-group row">
			    <label htmlFor="exampleFormControlInput1" className="col-sm-4 col-form-label"><span className="text-info">{inputInfos.type}</span> - {inputInfos.name}</label>
			    <div className="col-sm-8">
			    	<input value = {FilesStore.functionsInputsValues[idCurrentSM][functionId][inputIndex]} type="text" className="form-control" placeholder="" onChange={this.handleChange} />
			    </div>
			</div>
	    );
  	}
}

export default FunctionInput;