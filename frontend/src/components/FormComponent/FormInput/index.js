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
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    require: true,
    disabled: false,
  };

  renderField = field => {
    const { input, meta } = field;
    const { type, label, disabled } = this.props;

    const fieldErrorClass =
      meta.touched && meta.error ? 'border border-danger' : '';
    const labelErrorClass = meta.touched && meta.error ? 'text-danger' : '';
    return (
      <div className="form-group">
        <label className={labelErrorClass} htmlFor={input.name}>
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            className={`form-control ${fieldErrorClass}`}
            {...input}
            disabled={disabled}
          ></textarea>
        ) : (
          <input
            className={`form-control ${fieldErrorClass}`}
            {...input}
            disabled={disabled}
            type={type}
          />
        )}
        {!meta.active && meta.touched && meta.error && (
          <span className={labelErrorClass}>{meta.error}</span>
        )}
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
