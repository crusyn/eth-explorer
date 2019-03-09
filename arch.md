# architecture

This is a react application using redux & saga for state management.

## react components

The `containers/AllTransactionsContainer.js` and `components/AllTransactions.js` contain all other components in the app.

Each pure stateless component has it's own associated container.

## redux

This app uses redux to make it easy to understand the applications data flow and state transitions.

### overall application flow

#### user input

1. _User Query or Filter_ - The user searches for an _ethereum address_ or _filters the current view with a date range_.
2. _Action Dispatched_ - The search or filter form submit dispatches a `SEARCH/` or `FILTER/` action to the store.

_Valid Action_ - If the action is valid the corresponding saga will push the `address` or `startDate` and/or `endDate` to the browser history and a `/SUCCESS` action.

_Invalid Action_ - If the input is invalid it will push a `/FAILURE` action with the corresponding error. The source component will display the error to the user.

3. In the case of a _Valid Action_ a `connected-react-router` pushes a `@@router/CALL_HISTORY_METHOD` change to the /{address} or ?queryParams

#### url change & fetch data

A URL change can occur when:

- the user changes the URL manually by clicking a browser bookmark
- the user clicks on a link in the ETH Explore app
- a url change is dispatched to the store

4. _Location Change or Page Load_ - If the location changes the `AllTransactionsContainer` lifecycle method hears the location change and dispatches a `TRANSACTIONS/GET_TRANSACTIONS/CALL` with the new `address`, `startDate`, and/or `endDate` from the URL.

5. _Reducers in Loading State_ - The .loading members of the `account` and `transactions` reducers will be set to `true` and the `TransactionDataGrid` and `Transaction Summary` will show a loading progress animation.

6. _GET_TRANSACTIONS_ - The [`sagas/transactions.js`](src/sagas/transactions.js) tries to get account and transaction data from etherscan, filters, and does some calcs.

_SUCCESS_ - If `GET_TRANSACTIONS/CALL` succeeds the account and transactions reducers update the store

_FAILURE_ - If the `GET_TRANSACTIONS/CALL` fails the account and transactions reducers do not make changes to the core state.

Either way the `.loading` member is set to `false`.

#### update components

7. _Components Updated_ - The `Transaction Summary` and `TransactionDataGrid` loading animation is replaced with rendered `account` and `transactions` data from the store as soon as they are notified that the store has been updated.

### reducers

There are three reducers:

1. _transactions_ - store transactions for a particular address
2. _account_ - stores account related information including `address`, `balance`, and aggregate transaction information.
3. _search_ - the search reducers manages the state of search.

### `actions.js`

All actions that can be dispatched to the store and related types are listed in [`actions.js`](src/actions.js).

Each action type can be in three states:

1. _CALL_ - a request was dispatched to the store. The payload is the contents of the request.
2. _SUCCESS_ - the request was successfully fulfilled. The payload is the result of the request.
3. _FAILURE_ - the request fulfillment failed. The payload is the error that caused the request to fail.

### sagas

`redux-saga` is used for API fetches and pushes to the browser history to change the URL. `connected-react-router` is used so that state changes can be dispatched as actions into the store.

#### `sagas/search.js`

The [`search.js`](src/sagas/search.js) saga handles input into the search text field at the top of the app.

It is set up to be able to scale to adding other search terms such as blocks, transaction hashes, etc. The `search.js` saga determines the search type based on the input.

A valid `searchQueryTypes.ADDRESS` search ultimately triggers a change to the address in the URL. See [overall app flow](#overall-application-flow).

#### `sagas/filter.js`

Similar to search, the [filter saga](src/sagas/filter.js) checks the validity of the filter dates and then pushes them to the query string of the URI in the form: `start={startTime}&end={endTime}`.

A valid filter ultimately triggers a change to the address in the URL. See [overall app flow](#overall-application-flow).

#### `sagas/transactions.js` saga

The [transactions saga](src/sagas/transactions.js) is the workhorse of the app and performs all API fetches and state changes for both the account and transaction data.

It also performs calculations to determine transaction aggregates `totalIn`, `totalOut`, `gasFees`, `netChange`, `balanceForward`, and `balanceEndDate`.

If the API fetch fails or etherscan complains about the fetch url the saga dispatches a failure action.
