import { action, observable } from "mobx";

class FilesStore {
	// All these array have the same generated ID for each item
	@observable files = []

	@observable smartContractInfos = []

	@observable web3Instances = []

	// truffle-contract instances
	@observable truffleInstances = []

	// emitted events
	@observable contractEvents = {}

	// id of the currently selected smart contract
	@observable currentlySelectedContract = ""

    @action
    addFile = (file) => {
        this.files.push(file)
    };

    @action
    addSMinfos = (SMinfos) => {
        this.smartContractInfos.push(SMinfos)
    };

    // web 3 instances
    @action
    addWeb3InstanceOfASmartContract = (web3Instance) => {
        this.web3Instances.push(web3Instance)
    };

    // truffle-contract instances
    @action
    addTruffleInstanceOfASmartContract = (truffleContractInstance) => {
        this.truffleInstances.push(truffleContractInstance)
    };

    @action
    selectContractIfNoneSet = (currentSM) => {
    	if(this.currentlySelectedContract === "")
        	this.currentlySelectedContract = currentSM
    };

    // creating the array that will hold the events for the smart contract/ on netID
    @action
    createEventsArray = (id, netId) => {
        this.contractEvents[id] = {}
        this.contractEvents[id][netId] = [] // creating an array of events of the network ID
    };

    @action
    addToEventsArray = (id, netId, newEvent) => {
        this.contractEvents[id][netId].push(newEvent)
    };
}

export default new FilesStore();
