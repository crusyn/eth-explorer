import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../actions";
import queryString from "query-string";

import { AllTransactions } from "../components/";

const mapStateToProps = state => ({
  transactions: state.transactions,
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  getTransactions(address, start, end) {
    dispatch(actions.getTransactions.call(address, start, end));
  }
});

const getTransactionsFromURL = props => {
  const qs = queryString.parse(props.location.search);
  props.getTransactions(props.match.params.address, qs.start, qs.end);
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      getTransactionsFromURL(this.props);
    },
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        getTransactionsFromURL(this.props);
      }
    }
  })
)(AllTransactions);
