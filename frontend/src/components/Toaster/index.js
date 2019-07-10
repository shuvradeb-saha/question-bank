import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';

import ErrorMessage from './errorMessage';

const DEFAULT_TOAST_TIMER = 5000;

/**
 * Toast success type message.
 *
 * @param {string} message - Message to show
 * @returns {number} Toast id
 */
export const toastSuccess = message =>
  toast.success(message, {
    className: 'toaster-success',
  });

/**
 * Toast info type message.
 *
 * @param {string} message - Message to show
 * @returns {number} Toast id
 */
export const toastInfo = message =>
  toast.info(message, {
    className: 'toaster-info',
  });

/**
 * Toast error type message.
 *
 * @param {string} message - Message to show
 * @param {string} errorId - Id of the error. Useful in case of rest api errors.
 * @returns {number} Toast id
 */
export const toastError = (message, errorId) =>
  toast.error(<ErrorMessage message={message} id={errorId} />, {
    className: 'toaster-error',
    autoClose: false,
  });

/**
 * Check active status of a toast with given id.
 * @param {number} id
 * @returns {boolean} Active status
 */
export const isToastActive = id => toast.isActive(id);

/**
 * Update an existing toast.
 *
 * @param {!number} id - Id of the toast to be updated
 * @param {Object} config - New configuration object
 * @param {string=} config.render - New message
 * @param {string=} config.type - New Toast type
 * @param {number} [config.autoClose=5000] - New auto close timer
 */
export const updateToast = (id, config) => {
  toast.update(id, {
    autoClose: DEFAULT_TOAST_TIMER,
    ...config,
  });
};

export default class Toaster extends Component {
  static propTypes = {
    timeout: PropTypes.number,
    position: PropTypes.string,
    hideProgressBar: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
  };

  static defaultProps = {
    timeout: DEFAULT_TOAST_TIMER,
    position: 'top-right',
    hideProgressBar: false,
    pauseOnHover: true,
  };

  render() {
    const { timeout, position, hideProgressBar, pauseOnHover } = this.props;

    return (
      <ToastContainer
        position={position || 'top-right'}
        autoClose={timeout}
        hideProgressBar={hideProgressBar}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover={pauseOnHover}
        className="toaster"
      />
    );
  }
}
