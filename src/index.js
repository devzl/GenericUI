import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import registerServiceWorker from "./utilis/registerServiceWorker";

import { Provider } from "mobx-react";
import UiStore from "./stores/UiStore";

const Root = (
  <Provider UiStore={UiStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
