import { action, observable } from "mobx";

class FilesStore {
	@observable files = []

    @action
    addFile = (file) => {
        this.files.push(file)
    };
}

export default new FilesStore();
