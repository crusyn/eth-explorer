import { takeEvery, put } from "redux-saga/effects";
import { actions, types } from "../actions";

const etherscanAPIKey = "D181DZZYNHEWNN9R76CPGUVNGM53YSBF97";

const tranAPI = account => {
  return (
    "http://api.etherscan.io/api?module=account&action=txlist&address=" +
    account +
    "&apikey=" +
    etherscanAPIKey
  );
};

const balanceAPI = account => {
  return (
    "https://api.etherscan.io/api?module=account&action=balance&address=" +
    account +
    "&tag=latest&apikey=" +
    etherscanAPIKey
  );
};

//TODO: needs unit tests
const sumOfTrans = (trans, address) => {
  if (trans == null) return 0;
  let totalIn = 0;
  let totalOut = 0;
  let gasFees = 0;
  trans.forEach(tran => {
    if (!isNaN(tran.value)) {
      if (tran.from === address && tran.to !== address) {
        totalOut = totalOut + parseInt(tran.value);
        gasFees = gasFees + parseInt(tran.gasUsed) * parseInt(tran.gasPrice);
      } else if (tran.to === address && tran.from !== address)
        totalIn = totalIn + parseInt(tran.value);
    }
  });
  const totals = { totalIn, totalOut, gasFees };
  return totals;
};

export function* getTransactions({
  payload: { address = "", startDate = "", endDate = "" }
}) {
  if (!address) {
    yield put(actions.getTransactions.success([], {}));
    return;
  }

  let balanceResponseBody, tranResponseBody;
  try {
    //get balance data
    const balanceResponse = yield fetch(balanceAPI(address));
    balanceResponseBody = yield balanceResponse.json();

    if (balanceResponseBody.status !== "1") {
      yield put(actions.getTransactions.failure(balanceResponseBody.result));
      return;
    }

    //get tran data
    const tranResponse = yield fetch(tranAPI(address));
    tranResponseBody = yield tranResponse.json();
    if (
      tranResponseBody.status !== "1" &&
      tranResponseBody.message !== "No transactions found"
    ) {
      yield put(actions.getTransactions.failure(tranResponseBody.result));
      return;
    }
  } catch (e) {
    yield put(actions.getTransactions.failure(e));
    return;
  }

  const transFromAPI = tranResponseBody.result;

  //TODO: the bellow needs refactoring and unit tests
  let filteredTrans = transFromAPI;
  let netTransValueToToday = 0;

  if (endDate || startDate) {
    if (!endDate) {
      filteredTrans = yield transFromAPI.filter(
        tran => tran.timeStamp >= startDate
      );
    } else {
      filteredTrans = yield transFromAPI.filter(
        tran => tran.timeStamp <= endDate && tran.timeStamp >= startDate
      );
    }
    const tranBetEndAndToday = yield transFromAPI.filter(
      tran => tran.timeStamp > endDate
    );
    const sumBetEndAndToday = yield sumOfTrans(tranBetEndAndToday, address);
    netTransValueToToday =
      sumBetEndAndToday.totalIn -
      sumBetEndAndToday.totalOut -
      sumBetEndAndToday.gasFees;
  }

  const { totalIn, totalOut, gasFees } = yield sumOfTrans(
    filteredTrans,
    address
  );

  //TODO: needs unit tests
  const balance = balanceResponseBody.result;
  const balanceEndDate = balance - netTransValueToToday;
  const netChange = totalIn - totalOut - gasFees;
  const balanceForward = balanceEndDate - netChange;

  yield put(
    actions.getTransactions.success(filteredTrans, {
      address,
      balance,
      balanceEndDate,
      balanceForward,
      totalIn,
      totalOut,
      gasFees,
      netChange,
      startDate,
      endDate
    })
  );
}

export default function* watchTransactionSagas() {
  yield takeEvery(types.GET_TRANSACTIONS.CALL, getTransactions);
}
