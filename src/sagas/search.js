import { takeEvery, put } from "redux-saga/effects";
import { actions, types } from "../actions";
import { searchQueryTypes, searchErrorTypes } from "../constants";
import { push } from "connected-react-router";

export function* search({ payload: { query } }) {
  let trimmedQuery;
  let queryType;
  try {
    trimmedQuery = query.trim();

    if (!trimmedQuery) {
      queryType = searchQueryTypes.NONE;
    } else if (isAddress(trimmedQuery)) {
      queryType = searchQueryTypes.ADDRESS;
    } else {
      yield put(
        actions.search.failure({
          type: searchErrorTypes.INVALID_ADDRESS,
          message: `"${trimmedQuery}" is not a valid address.`,
          details: ""
        })
      );
      return;
    }
  } catch (e) {
    put(
      actions.search.failure({
        type: searchErrorTypes.UNKNOWN,
        message: "unknown error encountered",
        details: e
      })
    );
  }

  if (
    queryType === searchQueryTypes.ADDRESS ||
    queryType === searchQueryTypes.NONE
  ) {
    yield put(actions.search.success(queryType, trimmedQuery));
    yield put(push("/" + trimmedQuery));
  }
}

export default function* watchTransactionSagas() {
  yield takeEvery(types.SEARCH.CALL, search);
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isAddress = function(address) {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
};
