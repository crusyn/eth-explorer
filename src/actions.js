export const types = {
  GET_TRANSACTIONS: {
    CALL: "TRANSACTIONS/GET_TRANSACTIONS/CALL",
    SUCCESS: "TRANSACTIONS/GET_TRANSACTIONS/SUCCESS",
    FAILURE: "TRANSACTIONS/GET_TRANSACTIONS/FAILURE"
  },
  SEARCH: {
    CALL: "SEARCH/SEARCH/CALL",
    SUCCESS: "SEARCH/SEARCH/SUCCESS",
    FAILURE: "SEARCH/SEARCH/FAILURE"
  },
  FILTER: {
    CALL: "FILTER/FILTER/CALL",
    SUCCESS: "FILTER/FILTER/SUCCESS",
    FAILURE: "FILTER/FILTER/FAILURE"
  }
};

export const actions = {
  getTransactions: {
    call: (address, startDate = "", endDate = "") => ({
      type: types.GET_TRANSACTIONS.CALL,
      payload: { address, startDate, endDate }
    }),
    success: (transactions, account) => ({
      type: types.GET_TRANSACTIONS.SUCCESS,
      payload: { transactions, account }
    }),
    failure: error => ({
      type: types.GET_TRANSACTIONS.FAILURE,
      payload: { error }
    })
  },
  search: {
    call: query => ({
      type: types.SEARCH.CALL,
      payload: { query }
    }),
    success: (resultType, value) => ({
      type: types.SEARCH.SUCCESS,
      payload: { resultType, value }
    }),
    failure: error => ({
      type: types.SEARCH.FAILURE,
      payload: error
    })
  },
  filter: {
    call: (start, end) => ({
      type: types.FILTER.CALL,
      payload: { start, end }
    }),
    success: (start, end) => ({
      type: types.FILTER.SUCCESS,
      payload: { start, end }
    }),
    failure: error => ({
      type: types.FILTER.FAILURE,
      payload: error
    })
  }
};

export default actions;
