import { action, observable } from "mobx";

import Web3 from "web3";

// Will decide later if it's wise to keep web3 as an observable
class WebStore {
	@observable web3

	// id of the currently connected to ethereum network (for now it's locked on one, but perhaps later we will use multiple web3 instances)
	@observable currentNetID = ""

	constructor() {
		this.startWeb()
	}

	// for now always called from SCsDropZone, later won't be if we use multiple web3 instances
    @action
    setCurrentNetID = (netId) => {
        this.currentNetID = netId
    };

    @action
    startWeb = () => {
    	// givenProvider by metamask or ganache directly - only one instance for now
		// TODO make it configurable by the user
        this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

        // Fix truffle contracts problem
        this.web3.providers.HttpProvider.prototype.sendAsync = this.web3.providers.HttpProvider.prototype.send;

        //Setting net id
        this.web3.eth.net.getId().then(netId => this.setCurrentNetID(netId))
    };
}

export default new WebStore();
