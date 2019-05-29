import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { required } from '../../utils/validation';
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
    const { input, meta } = field;
    const { type, label, require } = this.props;

    return (
      <div>
        <label htmlFor={input.name}>{label}</label>

        <input {...input} type={type} />
      </div>
    );
  };

  render() {
    const { name, label, type, require } = this.props;

    const parse = value =>
      value === undefined ? undefined : parseInt(value, 10);
    return (
      <div>
        <div className="row">
          <div className="column">
            <div>
              <Field
                name={name}
                component={this.renderField}
                label={label}
                type={type}
                validate={require ? [required] : []}
                parse={type === 'number' ? parse : null}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormInput;
