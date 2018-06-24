import { action, observable } from "mobx";

// to debug mobx vars
const mobx = require("mobx");

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

	// infos of the currently selected smart contract
	@observable currentlySelectedContractInfos

    // keep track of input values of the functions of the smart contract (var["smart contract ID"]["function ID"]["Input index"]) the input array has the same order as the on present in the functions of smartContractInfos 
    // this structure was chosen to keep the modifications of the values atomic and not mix them directly into smartContractInfos
    @observable functionsInputsValues = {}

    @action
    addFile = (file) => {
        this.files.push(file)
    };

    @action
    addSMinfos = (SMinfos) => {
        this.smartContractInfos.push(SMinfos)
        this.generateInputValueStructure(SMinfos)
    };

    // Creating storing structure for input values of the functions: var["smart contract ID"]["function ID"]["Input index"]
    @action
    generateInputValueStructure = (SMinfos) => {
        this.functionsInputsValues[SMinfos.generatedId] = {}
        
        for (var i = 0; i < SMinfos.abi.length; i++) {
            this.functionsInputsValues[SMinfos.generatedId][SMinfos.abi[i].generatedId] = []
            for (var j = 0; j < SMinfos.abi[i].inputs.length; j++) {
                this.functionsInputsValues[SMinfos.generatedId][SMinfos.abi[i].generatedId].push("")
            }
        }
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
    	if(this.currentlySelectedContract === "") {
        	this.currentlySelectedContract = currentSM
        	this.currentlySelectedContractInfos = this.smartContractInfos.find((c) => c.generatedId === this.currentlySelectedContract)
    	}
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

    // Stores the input value taken from the display of the abi functions
    @action
    modifyCurrentInputValueForFunctionInput = (newValue, functionId, inputIndex, idCurrentSM) => {
        this.functionsInputsValues[idCurrentSM][functionId][inputIndex] = newValue
    };
}

export default new FilesStore();
