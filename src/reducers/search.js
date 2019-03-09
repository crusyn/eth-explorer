import { types } from "../actions";
import { searchStatusTypes, searchQueryTypes } from "../constants";

const createSearchStatus = (type, message) => ({
  type,
  message
});

const initialState = createSearchStatus(searchStatusTypes.NONE, "");

export const searchStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH.CALL:
      return createSearchStatus(searchStatusTypes.SEARCHING, "searching...");

    case types.SEARCH.SUCCESS:
      if (action.payload.resultType === searchQueryTypes.NONE)
        return createSearchStatus(searchStatusTypes.NONE, "");
      else if (action.payload.resultType === searchQueryTypes.ADDRESS)
        return createSearchStatus(
          searchStatusTypes.VALID,
          `Valid address "${action.payload.value}"`
        );
      else return state;

    case types.SEARCH.FAILURE:
      return createSearchStatus(
        searchStatusTypes.ERROR,
        action.payload.message
      );

    default:
      return state;
  }
};
