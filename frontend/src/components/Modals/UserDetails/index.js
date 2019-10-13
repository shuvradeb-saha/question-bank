import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalFooter, Modal, ModalHeader, ModalBody } from 'reactstrap';
import moment from 'moment';

export default class UserDetails extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    details: PropTypes.any,
  };

  render() {
    const { isOpen, toggle, details } = this.props;

    return (
      <div>
        <Modal
          size="md"
          isOpen={isOpen}
          centered
          backdrop={false}
          toggle={toggle}
        >
          <ModalHeader>User Information</ModalHeader>
          <ModalBody>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>
                    {details.firstName} {details.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{details.email}</td>
                </tr>

                <tr>
                  <td>EIIN</td>
                  <td>{details.eiinNumber}</td>
                </tr>

                <tr>
                  <td>Permanent Address</td>
                  <td>{details.permanentAddress}</td>
                </tr>

                <tr>
                  <td>Current Address</td>
                  <td>{details.tempAddress}</td>
                </tr>
                <tr>
                  <td>Birth Date</td>
                  <td>
                    {moment
                      .unix(details.birthDate / 1000)
                      .format('DD MMM YYYY')}
                  </td>
                </tr>
                <tr>
                  <td>Join Date</td>
                  <td>
                    {moment.unix(details.joinDate / 1000).format('DD MMM YYYY')}
                  </td>
                </tr>
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
