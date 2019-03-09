import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { Progress } from "./";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import PropTypes from "prop-types";

import { formatEthValue, timeStampDateFormat } from "../utils";

import Grid from "@material-ui/core/Grid";

const GridCard = ({ heading, value, showIfZero }) => (
  <Grid item>
    <div
      style={{
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10
      }}
    >
      <Typography variant="caption">{heading}</Typography>
      <div>{value || showIfZero ? formatEthValue(value) : ""}</div>
    </div>
  </Grid>
);
const TransactionSummary = ({ classes, account }) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>
        <Toolbar>
          <Typography variant="h6">
            {account.address ? account.address : "0x"}
          </Typography>
        </Toolbar>
      </div>
      {account.loading ? (
        <Progress />
      ) : account.address ? (
        <div className={classes.main}>
          <div>
            {account.startDate || account.endDate ? (
              <div>
                <Typography variant="subheading">balances</Typography>
                <Grid container spacing={16}>
                  {account.startDate ? (
                    <GridCard
                      heading={timeStampDateFormat(account.startDate)}
                      value={account.balanceForward}
                    />
                  ) : (
                    ""
                  )}
                  <GridCard
                    heading={
                      account.endDate
                        ? timeStampDateFormat(account.endDate)
                        : ""
                    }
                    value={account.endDate ? account.balanceEndDate : ""}
                  />
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="subheading">balance</Typography>
                <div
                  style={{
                    paddingBottom: 10,
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingLeft: 10
                  }}
                >
                  {formatEthValue(account.balance)}
                </div>
              </div>
            )}
          </div>
          <div>
            <Typography variant="subheading">transaction totals</Typography>
            <Grid container spacing={16}>
              <GridCard heading="In" value={account.totalIn} showIfZero />
              <GridCard heading="Out" value={account.totalOut} showIfZero />
              <GridCard heading="Gas" value={account.gasFees} showIfZero />
              <GridCard heading="Net" value={account.netChange} showIfZero />
            </Grid>
          </div>
        </div>
      ) : (
        <Typography
          className={classes.main}
          color="textSecondary"
          variant="subheading"
        >
          please search for an address above
        </Typography>
      )}
    </Paper>
  );
};

TransactionSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionSummary);
