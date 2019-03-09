import React from "react";
import TextField from "@material-ui/core/TextField";
import { searchStatusTypes } from "../constants";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.value);
    this.setState({ value: "" });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //working with controlled components and submitting: https://reactjs.org/docs/forms.html

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            placeholder="search for an ethereum address"
            autoFocus={true}
            fullWidth={true}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <p>
          {this.props.searchStatus.message &&
          this.props.searchStatus.type === searchStatusTypes.ERROR
            ? this.props.searchStatus.message
            : " "}
        </p>
      </div>
    );
  }
}

export default Search;
