import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormInput } from 'components';

class RejectModal extends Component {
  static propTypes = {
    onOkClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
    pristine: PropTypes.bool,
    valid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
  };

  render() {
    const {
      isOpen,
      toggle,
      onOkClick,
      pristine,
      valid,
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <div className="container-fluid">
        <Modal centered isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Enter Rejection Cause</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onOkClick)}>
              <FormInput type="textarea" name="rejectCause" label="" />
              <Button
                size="sm"
                color="primary"
                disabled={!valid || pristine || submitting}
                type="submit"
              >
                Submit
              </Button>
              <Button
                size="sm"
                color="outline-danger"
                onClick={toggle}
                type="button"
              >
                Cancel
              </Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: 'rejectForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(RejectModal);
