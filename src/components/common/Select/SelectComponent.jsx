import React from "react";
import "./SelectComponent.scss";
class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Male" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.getSelectedData(event.target.value);
  }

  render() {
    return (
      <>
        <form onSubmit={(e) => this.props.sendData(e)}>
          <label>Выберите пол:</label>
          <select value={this.props.value} onChange={this.props.onChangeValue}>
            <option value="Male">М</option>
            <option value="Female">Ж</option>
          </select>
        </form>
      </>
    );
  }
}

export default SelectComponent;
