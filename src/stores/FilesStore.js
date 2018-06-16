import { action, observable } from "mobx";

class FilesStore {
	// All these array have the same generated ID for each item
	@observable files = []

	@observable smartContractInfos = []

	@observable truffleInstance = []

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

    @action
    addTruffleInstanceOfASmartContract = (truffleContractInstance) => {
        this.smartContractInfos.push(truffleContractInstance)
    };

    @action
    selectContractIfNoneSet = (currentSM) => {
    	if(this.currentlySelectedContract === "")
        	this.currentlySelectedContract = currentSM
    };
}

export default new FilesStore();
