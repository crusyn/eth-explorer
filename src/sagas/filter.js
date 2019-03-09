import { takeEvery, put } from "redux-saga/effects";
import { actions, types } from "../actions";
import { filterErrorTypes } from "../constants";
import { push } from "connected-react-router";

export function* filter({ payload: { start, end } }) {
  let parsedStart;
  let parsedEnd;
  try {
    parsedStart = start ? Math.floor(Date.parse(start) / 1000 + 18000) : "";
    parsedEnd = end ? Math.ceil(Date.parse(end) / 1000 + 18000) : "";
  } catch (e) {
    put(
      actions.filter.failure({
        type: filterErrorTypes.INVALID_DATE,
        message: "Date Conversion Error",
        details: e
      })
    );
  }
  yield put(actions.filter.success(parsedStart, parsedEnd));

  const startStr = !parsedStart ? "" : "start=" + parsedStart + "&";
  const endStr = !parsedEnd ? "" : "end=" + parsedEnd + "&";

  yield put(push({ search: `?${startStr}${endStr}` }));
}

export default function* watchTransactionSagas() {
  yield takeEvery(types.FILTER.CALL, filter);
}
