import { types } from "../actions";

const tranInitialState = { loading: false, transactions: [] };
const accountInitialState = {
  loading: false,
  address: "",
  balance: -1
};

export const transactions = (state = tranInitialState, action) => {
  switch (action.type) {
    case types.GET_TRANSACTIONS.CALL:
      return { ...state, loading: true }; //TODO add loading logic
    case types.GET_TRANSACTIONS.SUCCESS:
      return { loading: false, transactions: action.payload.transactions };
    case types.GET_TRANSACTIONS.FAILURE:
      return { ...state, loading: false }; //TODO: maybe do not blow away state is the load fails
    default:
      return state;
  }
};

export const account = (state = accountInitialState, action) => {
  switch (action.type) {
    case types.GET_TRANSACTIONS.CALL:
      return { ...state, loading: true, address: action.payload.address }; //TODO add loading logic
    case types.GET_TRANSACTIONS.SUCCESS:
      return action.payload.account.address
        ? { loading: false, ...action.payload.account }
        : { address: "" }; //this should be some no data screen
    case types.GET_TRANSACTIONS.FAILURE:
      return { ...state, loading: false }; //TODO: maybe do not blow away state is the load fails
    default:
      return state;
  }
};
