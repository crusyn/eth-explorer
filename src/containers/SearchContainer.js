import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../actions";

import { Search } from "../components/";

const mapStateToProps = state => ({
  searchStatus: state.searchStatus
});

const mapDispatchToProps = dispatch => ({
  search(query) {
    dispatch(actions.search.call(query));
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search);
