import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progessDiv: {
    textAlign: "center"
  }
});

//adapted from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/progress/CircularDeterminate.js
class CircularDeterminate extends React.Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.progessDiv}>
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularDeterminate);
