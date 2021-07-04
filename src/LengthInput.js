import React, { PureComponent } from "react";

import "./lengthInput.css";

class LengthInput extends PureComponent {
  constructor(props) {
    super(props);
    // type: session | break
    // value: value of session / break length
    // setValue: setState for value
  }

  render() {
    const type = this.props.type;
    const value = this.props.value;
    const setValue = this.props.setValue;

    return (
      <div className="inputContainer">
        <label id={`${type}-label`}>{type}</label>
        <div className="inputSelectors">
          <button id={`${type}-increment`} onClick={() => setValue(value + 60)}>
            +
          </button>
          <span id={`${type}-length`}>{Math.round(value / 60)}</span>
          <button id={`${type}-decrement`} onClick={() => setValue(value - 60)}>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default LengthInput;
