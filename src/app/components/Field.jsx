import React from "react";

const Field = class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: false
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.recognizeTouch = this
      .recognizeTouch
      .bind(this);
  }

  onChange(event) {
    this
      .props
      .onChange(event);
    this.recognizeTouch();
    if (this.validation) {
      clearTimeout(this.validation);
    }
    this.validation = setTimeout(() => {
      this.setState(Object.assign({}, this.state, {
        error: this
          .props
          .onValidation()
      }));
    }, 500);
  }

  recognizeTouch() {
    this.setState(Object.assign({}, this.state, {touched: true}));
  }

  render() {
    return <span>
      <input
        type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={this.onChange}/> {this.state.touched && this.state.error && <span className="error">{this.state.error}</span>}
    </span>;
  }
};

Field.propTypes = {
  type: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onValidation: React.PropTypes.func.isRequired
};

export default Field;
