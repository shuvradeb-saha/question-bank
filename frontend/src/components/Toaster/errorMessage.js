import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FAIcon from '@fortawesome/react-fontawesome';

export default class Error extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = {
    id: '',
  };

  copyToClipboard = async (event, text) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // We should never use alert. But this should never happen as well :-)
      alert(`Failed to copy: ${text}. Error: ${err}`);
    }
  };

  render() {
    const { message, id } = this.props;
    return (
      <div className="error-message-wrapper">
        <p className="message">{message}</p>
        {id && (
          <p className="id">
            <span>Reference: {id}</span>
            <span>
              <a
                className="copy"
                href="/copy-to-clipboard"
                onClick={evt => this.copyToClipboard(evt, id)}
              >
                <FAIcon icon="copy" size="lg" />
              </a>
            </span>
          </p>
        )}
      </div>
    );
  }
}
