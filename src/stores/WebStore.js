import { action, observable } from "mobx";

import Web3 from "web3";

// Will decide later if it's wise to keep web3 as an observable
class WebStore {
	@observable web3

	constructor() {
		this.startWeb()
	}

    @action
    startWeb = () => {
    	// givenProvider by metamask or ganache directly - only one instance for now
		// TODO make it configurable by the user
        this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

        // Fix truffle contracts problem
        this.web3.providers.HttpProvider.prototype.sendAsync = this.web3.providers.HttpProvider.prototype.send;
    };
}

export default new WebStore();
