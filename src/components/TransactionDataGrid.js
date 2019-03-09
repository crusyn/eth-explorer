import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { Progress } from "./";

import {
  formatEthValue,
  timeStampDateFormat,
  timeStampTimeFormat
} from "../utils";

import { Link as RouterLink } from "react-router-dom";

//orig: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/tables/EnhancedTable.js

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const columnHeaders = [
  {
    id: "timeStamp",
    numeric: true,
    disablePadding: false,
    label: "date"
  },
  {
    id: "timeStampAsTime",
    numeric: true,
    disablePadding: false,
    label: "time"
  },
  {
    id: "blockNumber",
    numeric: true,
    disablePadding: false,
    label: "blockNumber"
  },
  { id: "from", numeric: true, disablePadding: false, label: "from" },
  { id: "to", numeric: true, disablePadding: false, label: "to" },
  { id: "value", numeric: true, disablePadding: false, label: "value" },
  { id: "inout", numeric: false, disablePadding: false, label: "" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnHeaders.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, tableName = "Default Table Name" } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {tableName}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  tableName: PropTypes.string
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  noWrap: {
    whiteSpace: "nowrap"
  }
});

class EnhancedTable extends React.Component {
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.tranData !== newProps.tranData) {
      this.setState({
        data: newProps.tranData.transactions,
        loading: newProps.tranData.loading
      });
    }
  }

  state = {
    order: "asc",
    orderBy: "timeStamp",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {};

  selectRow = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      loading
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    //TODO: don't love that this is here, would prefer the format function to be passed in with each value
    const ethAddressLink = (address, noLinkAddress) => {
      const shortenedAddress = address
        ? address.substring(0, 5) + "..." + address.substring(30, 42)
        : "";
      return address === noLinkAddress ? (
        <div>
          <strong>{shortenedAddress}</strong>
        </div>
      ) : (
        <Link component={RouterLink} to={"/" + address}>
          {shortenedAddress}
        </Link>
      );
    };

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName={this.props.tableName}
        />
        {loading ? (
          <div>
            <Progress />
          </div>
        ) : data.length !== 0 ? (
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    n.id = n.hash; //TODO: hacky do transform elsewhere
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={event => this.selectRow(event, n.id)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {timeStampDateFormat(n.timeStamp)}
                        </TableCell>
                        <TableCell className={classes.noWrap} align="right">
                          {timeStampTimeFormat(n.timeStamp)}
                        </TableCell>
                        <TableCell align="right">{n.blockNumber}</TableCell>
                        <TableCell align="right">
                          {ethAddressLink(n.from, this.props.ethAddress)}
                        </TableCell>
                        <TableCell align="right">
                          {ethAddressLink(n.to, this.props.ethAddress)}
                        </TableCell>
                        <TableCell align="right">
                          {formatEthValue(n.value)}
                        </TableCell>
                        <TableCell>
                          {n.from === this.props.ethAddress
                            ? "OUT"
                            : n.to === this.props.ethAddress
                            ? "IN"
                            : ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div />
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  /** classes: Material UI classes object **/
  classes: PropTypes.object.isRequired,
  /** tranData: an object containing enriched transactions and loading members see transactions reducer and saga for more information **/
  tranData: PropTypes.object,
  /** tableName: name to display in the toolbar of this table **/
  tableName: PropTypes.string
};

export default withStyles(styles)(EnhancedTable);
