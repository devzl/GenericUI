import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("UiStore")
@observer
class App extends Component {
  render() {
    const { UiStore } = this.props;

    return (
        <div className="App" onClick={e => {
          e.preventDefault();
          UiStore.toggleTheme();
        }}>
          <h1>{UiStore.theme}</h1>
        </div>
    );
  }
}

export default App;
