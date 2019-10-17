import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';

import { FormSelect } from 'components';

class AllocateSubject extends Component {
  static propTypes = {
    actType: PropTypes.string.isRequired,
    subjectIds: PropTypes.array,
    teacherName: PropTypes.string,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    selectedClass: PropTypes.object,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    toggle: PropTypes.func,
    onSuspend: PropTypes.func,
    valid: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    isUpdate: false,
  };

  prepareClasses = classes =>
    classes.map(cls => ({
      label: cls.get('name'),
      value: cls.get('id'),
    }));

  prepareSubjects = subjects => {
    const { selectedClass } = this.props;
    return subjects
      .filter(
        subject =>
          selectedClass && subject.get('classId') === selectedClass.get('value')
      )
      .map(subject => ({
        label: subject.get('name'),
        value: subject.get('id'),
      }));
  };

  getNameBySubject = (subjectId, type) => {
    const subject = this.props.subjects.find(
      item => item.get('id') === subjectId
    );
    if (type === 'subject') {
      return subject.get('name');
    }
    const clasz = this.props.classes.find(
      item => item.get('id') === subject.get('classId')
    );
    return clasz.get('name');
  };

  render() {
    const {
      isOpen,
      toggle,
      handleSubmit,
      selectedClass,
      valid,
      pristine,
      submitting,
      actType,
      subjectIds,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal centered isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {`Allocate subject to ${this.props.teacherName}`}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormSelect
                name="class"
                label="Select class"
                options={this.prepareClasses(this.props.classes)}
              />
              <FormSelect
                name="subject"
                label="Select subject"
                placeholder={
                  selectedClass ? 'Select Subject' : 'Please Select Class First'
                }
                disabled={selectedClass ? false : true}
                options={this.prepareSubjects(this.props.subjects)}
              />
              <span>
                <Button
                  disabled={!valid || pristine || submitting}
                  size="sm"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={this.props.toggle}
                  type="button"
                >
                  Cancel
                </button>
              </span>
            </form>
          </ModalBody>
          {actType === 'edit' && (
            <ModalFooter>
              <table className="table table-bordered text-center">
                <caption style={{ captionSide: 'top', color: 'black' }}>
                  Previously allocated subjects
                </caption>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectIds.map((subjectId, i) => (
                    <tr key={i}>
                      <td>{this.getNameBySubject(subjectId, 'class')}</td>
                      <td> {this.getNameBySubject(subjectId, 'subject')} </td>
                      <td>
                        <button
                          onClick={() => this.props.onSuspend(subjectId)}
                          className="btn btn-sm btn-dark"
                        >
                          Suspend
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModalFooter>
          )}
        </Modal>
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: 'allocateSubjectForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(AllocateSubject);
