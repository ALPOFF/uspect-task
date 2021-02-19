import React from "react";
import { connect } from "react-redux";
import { getFilteredCharactersData } from "../../../state/characters-reducer";
import "./InputComponent.scss";

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div style={{ paddingRight: 10 }}>
        <form onSubmit={(e) => this.props.sendData(e)}>
          <label>Поиск</label>
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChangeValue}
          />
        </form>
      </div>
    );
  }
}

export default connect(null, {
  getFilteredCharactersData,
})(InputComponent);
