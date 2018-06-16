import { action, observable } from "mobx";

class FilesStore {
	@observable files = []

	@observable smartContractInfos = []

    @action
    addFile = (file) => {
        this.files.push(file)
    };

    @action
    addSMinfos = (SMinfos) => {
        this.smartContractInfos.push(SMinfos)
    };
}

export default new FilesStore();
