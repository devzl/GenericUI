import React, { Component } from "react";

import { inject, observer } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Display an output of a function
@inject("FilesStore", "WebStore")
@observer
class FunctionOutput extends Component {

	outputValue () {
		const outputInfos = this.props.outputInfos;

		const { FilesStore } = this.props;
		const { WebStore } = this.props;
  		
  		const idCurrentSM = this.props.idCurrentSM;
  		const functionId = this.props.functionId;
  		const outputIndex = this.props.outputIndex;

  		let returnValue

  		if(outputInfos.type.startsWith("bytes")) {
  			if(FilesStore.functionsOutputsValues[idCurrentSM][functionId][outputIndex].length > 0) {
	  			returnValue = WebStore.web3.utils.toAscii(FilesStore.functionsOutputsValues[idCurrentSM][functionId][outputIndex]).replace(/\u0000/g, '')
  			}
  		} else {
  			returnValue = FilesStore.functionsOutputsValues[idCurrentSM][functionId][outputIndex]
  		}

  		return returnValue
	}

  	render() {

  		const outputInfos = this.props.outputInfos;

	    return (
	        <div className="form-group row">
			    <label htmlFor="exampleFormControlInput1" className="col-sm-4 col-form-label"><span className="text-info">{outputInfos.type}</span> - {outputInfos.name}</label>
			    <div className="col-sm-8">
			    	<input value = {this.outputValue()} type="text" className="form-control" placeholder="" readonly="readonly" />
			    </div>
			</div>
	    );
  	}
}

export default FunctionOutput;