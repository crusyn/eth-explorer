import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

import { createLogger } from "redux-logger";

import * as serviceWorker from "./serviceWorker";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const routerMiddlewareHistory = routerMiddleware(history);

const store = createStore(
  reducers(history),
  applyMiddleware(sagaMiddleware, createLogger(), routerMiddlewareHistory) //,
);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
