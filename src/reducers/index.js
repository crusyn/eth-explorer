import { combineReducers } from "redux";

import { transactions, account } from "./transactions";
import { searchStatus } from "./search";

import { connectRouter } from "connected-react-router";

const reducers = history =>
  combineReducers({
    account,
    transactions,
    searchStatus,
    router: connectRouter(history)
  });

export default reducers;
