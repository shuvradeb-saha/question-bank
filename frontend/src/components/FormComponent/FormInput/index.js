import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { required } from '../../../utils/validation';
import { Field } from 'redux-form/immutable';

class FormInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    require: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    require: true,
  };

  renderField = field => {
    const { input } = field;
    const { type, label } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input className="form-control" {...input} type={type} />
      </div>
    );
  };

  render() {
    const { name, label, type, require } = this.props;

    const parse = value =>
      value === undefined ? undefined : parseInt(value, 10);
    return (
      <Field
        name={name}
        component={this.renderField}
        label={label}
        type={type}
        validate={require ? [required] : []}
        parse={type === 'number' ? parse : null}
      />
    );
  }
}

export default FormInput;
