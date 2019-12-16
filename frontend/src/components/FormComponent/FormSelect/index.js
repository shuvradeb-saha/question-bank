import React, { Component } from 'react';
import Select from 'react-select';
import ImmutablePropTypes from 'react-immutable-proptypes';
import makeAnimated from 'react-select/lib/animated';
import PropTypes from 'prop-types';
import { required } from 'utils/validation';
import { Field } from 'redux-form/immutable';
import { fromJS } from 'immutable';

// import customStyles from './style';

export default class FormSelect extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    require: PropTypes.bool,
    multi: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.oneOfType([
      ImmutablePropTypes.list.isRequired,
      PropTypes.array.isRequired,
    ]),
  };

  static defaultProps = {
    require: true,
    options: '',
    multi: false,
    disabled: false,
  };

  renderField = field => {
    const { input, options, label, disabled } = field;

    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <Select
          {...input}
          value={input.value ? input.value.toJS() : null}
          components={makeAnimated()}
          onChange={value => {
            input.onChange(fromJS(value));
          }}
          onBlur={() => input.onBlur(input.value)}
          // styles={customStyles}
          options={options.toJS()}
          isMulti={this.props.multi}
          isDisabled={disabled}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  };

  render() {
    const { name, label, require, options, disabled } = this.props;

    return (
      <Field
        name={name}
        component={this.renderField}
        label={label}
        options={options}
        validate={require ? [required] : []}
        disabled={disabled}
      />
    );
  }
}
