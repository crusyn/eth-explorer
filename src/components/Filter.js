import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import { timeStampISO } from "../utils";

import PropTypes from "prop-types";

class Filter extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.startDate !== prevProps.startDate ||
      this.props.endDate !== prevProps.endDate
    ) {
      this.setState({
        startDate: timeStampISO(this.props.startDate),
        endDate: timeStampISO(this.props.endDate)
      });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: timeStampISO(this.props.startDate),
      endDate: timeStampISO(this.props.endDate)
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleClearFilterClick = this.handleClearFilterClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.filter(this.state.startDate, this.state.endDate);
  }

  handleStartDateChange(event) {
    this.setState({ startDate: event.target.value });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.value });
  }

  handleClearFilterClick(event) {
    this.setState({ startDate: "", endDate: "" });
    this.props.filter("", "");
  }

  //working with controlled components and submitting: https://reactjs.org/docs/forms.html

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.title}>
          <Toolbar>
            <Typography variant="h6">Filter Transactions</Typography>
          </Toolbar>
        </div>
        <div className={classes.main}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="start-date"
              placeholder="yyyy-mm-dd"
              type="date"
              label="filter start date"
              fullWidth={false}
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              className={classes.dateTextFields}
            />
            <TextField
              id="end-date"
              placeholder="yyyy-mm-dd"
              type="date"
              label="filter end date"
              fullWidth={false}
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              className={classes.dateTextFields}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClearFilterClick}
              className={classes.button}
            >
              Clear Filter
            </Button>
          </form>
        </div>
      </Paper>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filter);
