import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../actions";

import { Filter } from "../components/";

const mapStateToProps = state => ({
  startDate: state.account.startDate ? state.account.startDate : "",
  endDate: state.account.endDate ? state.account.endDate : ""
});

const mapDispatchToProps = dispatch => ({
  filter(from = "", to = "") {
    dispatch(actions.filter.call(from, to));
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Filter);
