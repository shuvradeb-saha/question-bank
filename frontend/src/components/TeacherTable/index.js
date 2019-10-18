import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableType } from 'containers/TeacherManagement/TableType';
import { MDBDataTable } from 'mdbreact';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { withRouter } from 'react-router-dom';

import { SubjectAllocationModal } from 'components/Modals';
import { makeAllClasses, makeAllSubjects } from 'state/login/selectors';
import API from 'utils/api';
import { toastSuccess, toastError } from '../Toaster';

const allocateSubjectFormSelector = formValueSelector('allocateSubjectForm');

class TeacherTable extends Component {
  static propTypes = {
    type: PropTypes.symbol.isRequired,
    teacherList: PropTypes.object.isRequired,
    onViewClick: PropTypes.func,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
    resetForm: PropTypes.func,
    viewInProgress: PropTypes.object.isRequired,
  };

  static defaultProps = {
    teacherList: fromJS([]),
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      actType: 'new',
      allocateId: 0,
      allocateSubjectIds: [],
      allocateTeacher: '',
      editInProgress: { id: -1, status: false },
    };
  }

  onAllocateClick = id => {
    this.props.resetForm();
    const teacher = this.props.teacherList.filter(t => t.get('id') === id);
    const teacherName = teacher && teacher.toJS()[0].fullName;
    this.setState({ allocateId: id, allocateTeacher: teacherName });
    this.onToggle();
  };

  onAllocate = async values => {
    const data = values.toJS();
    const dataToSave = {
      teacherId: this.state.allocateId,
      subjectId: parseInt(data.subject.value, 10),
    };
    try {
      const res = await API.post(
        '/api/headmaster/teacher-subject/ALLOCATE',
        dataToSave
      );
      if (res) {
        toastSuccess(
          `Subject: ${data.subject.label} allocated to ${this.state.allocateTeacher}`
        );
        this.props.history.push(this.props.location.pathname);
      } else {
        toastError(
          `Unable to allocate. ${data.subject.label} already allocated to ${this.state.allocateTeacher}`
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  onSuspend = async subjectId => {
    const dataToSave = {
      teacherId: this.state.allocateId,
      subjectId: parseInt(subjectId, 10),
    };
    if (window.confirm('Are you sure to suspend this teacher?')) {
      try {
        await API.post(
          '/api/headmaster/teacher-subject/UNALLOCATE',
          dataToSave
        );
        toastSuccess('Teacher has been suspended');
        this.props.history.push('/approved-teacher');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      return;
    }
  };

  onRemove = async id => {
    if (
      window.confirm(
        'All allocation of this teacher will be deleted. Are you sure to continue?'
      )
    ) {
      try {
        await API.post(`/api/headmaster/allocation/remove/${id}`);
        toastSuccess('All allocation has beed deleted.');
        this.props.history.push('/approved-teacher');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      return;
    }
  };

  onEditClick = async teacherId => {
    this.setState({ editInProgress: { id: teacherId, status: true } });
    const subjectIds = await API.get(`/api/headmaster/allocation/${teacherId}`);
    this.setState({ allocateSubjectIds: subjectIds, actType: 'edit' });
    this.onAllocateClick(teacherId);
    this.setState({ editInProgress: { id: -1, status: false } });
  };

  onToggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  createDataForTable = () => {
    const { type, teacherList, onViewClick } = this.props;
    const columns = [
      {
        label: 'Teacher Name',
        field: 'teacherName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ];

    const rows = teacherList.map((teacher, i) => ({
      teacherName: teacher.get('fullName'),
      email: teacher.get('email'),
      action: (
        <span key={i}>
          {this.props.viewInProgress.id === teacher.get('id') &&
          this.props.viewInProgress.status ? (
            <button className="btn btn-view btn-sm" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <button
              className="btn btn-sm btn-view"
              onClick={() => onViewClick(teacher.get('id'))}
            >
              View
            </button>
          )}

          {type === TableType.PENDING && (
            <span>
              <button
                className="btn btn-sm btn-success"
                onClick={() => this.onAllocateClick(teacher.get('id'))}
              >
                Allocate subject
              </button>
            </span>
          )}
          {type === TableType.APPROVED && (
            <span>
              <button
                className="btn btn-sm btn-rmv"
                onClick={() => this.onRemove(teacher.get('id'))}
              >
                Remove
              </button>
              {this.state.editInProgress.id === teacher.get('id') &&
              this.state.editInProgress.status ? (
                <button className="btn btn-dark btn-sm" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => this.onEditClick(teacher.get('id'))}
                >
                  Edit
                </button>
              )}
            </span>
          )}
        </span>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    const { type, classes, subjects, selectedClass } = this.props;

    return (
      <span>
        <div className="card">
          <div className={`card-header bg-dark text-light`}>
            <b>
              {type === TableType.PENDING
                ? TableType.PENDING.description
                : TableType.APPROVED.description}
            </b>
          </div>
          <div className="card-body">
            <MDBDataTable
              striped
              bordered
              small
              data={this.createDataForTable()}
            />
          </div>
        </div>
        <div>
          <SubjectAllocationModal
            actType={this.state.actType}
            subjectIds={this.state.allocateSubjectIds}
            isOpen={this.state.modal}
            teacherId={this.state.allocateId}
            teacherName={this.state.allocateTeacher}
            classes={classes}
            subjects={subjects}
            toggle={this.onToggle}
            selectedClass={selectedClass}
            onSubmit={this.onAllocate}
            onSuspend={this.onSuspend}
          />
        </div>
      </span>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedClass: state => allocateSubjectFormSelector(state, 'class'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
});

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('allocateSubjectForm')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withRouter,
  withConnect
)(TeacherTable);
