import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { AllTransactionsContainer } from "./containers";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/:address" component={AllTransactionsContainer} />
        <Route path="/" component={AllTransactionsContainer} />
      </Switch>
    );
  }
}

export default App;
