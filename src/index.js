import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import registerServiceWorker from "./utilis/registerServiceWorker";

import { Provider } from "mobx-react";
import FilesStore from "./stores/FilesStore";

import WebStore from "./stores/WebStore";

const Root = (
  <Provider FilesStore={FilesStore} WebStore={WebStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
