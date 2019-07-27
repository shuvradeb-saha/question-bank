/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { SubjectRegisterModal } from 'components/Modals';
import {
  fetchAllsubject,
  fetchAllClass,
  fetchSubject,
  saveSubject,
} from 'state/admin/action';
import {
  makeSubjects,
  makeSubjectDetail,
  makeClasses,
} from 'state/admin/selectors';

class SubjectInfo extends Component {
  static propTypes = {
    classes: PropTypes.object,
    fetchAllClass: PropTypes.func,
    fetchAllSubject: PropTypes.func,
    fetchSubject: PropTypes.func,
    resetForm: PropTypes.func,
    subjects: PropTypes.object,
    subjectDetails: PropTypes.object,
    saveSubject: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllClass();
    this.props.fetchAllSubject();
  }

  onSubjectSubmit = values => {
    this.props.saveSubject({
      ...values.toJS(),
      classId: values.toJS().class.value,
    });
  };

  onEditClick = id => {
    this.props.fetchSubject(id);
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: true,
    }));
  };

  onCreateClick = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
  };

  extractClassName = id => {
    const cls = this.props.classes.filter(cls => cls.get('id') === id).toJS();
    const className = cls && cls[0] ? cls[0].name : '';
    return className;
  };

  prepareInitialValues = () => {
    const { subjectDetails } = this.props;
    const initialClassId = subjectDetails.get('classId');
    const clasz = this.extractClassName(initialClassId) || '';
    const initData = {
      ...subjectDetails.toJS(),
      class: {
        value: initialClassId || '',
        label: clasz,
      },
    };
    return initData;
  };

  createDataForTable = () => {
    const { subjects } = this.props;
    const columns = [
      {
        label: 'Subject Name',
        field: 'subjectName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Subject Code',
        field: 'subjectCode',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Class',
        field: 'class',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = subjects.map(subject => ({
      subjectName: subject.get('name'),
      subjectCode: subject.get('subjectCode'),
      class: this.extractClassName(subject.get('classId')),
      action: (
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => this.onEditClick(subject.get('id'))}
        >
          Edit
        </button>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create Subject
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MDBDataTable
              striped
              bordered
              small
              data={this.createDataForTable()}
            />
          </div>
        </div>
        <SubjectRegisterModal
          classes={this.props.classes}
          isOpen={this.state.modal}
          isUpdate={this.state.edit}
          initialValues={this.state.edit ? this.prepareInitialValues() : {}}
          onSubjectSubmit={this.onSubjectSubmit}
          toggle={this.onCreateClick}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  classes: makeClasses(),
  subjects: makeSubjects(),
  subjectDetails: makeSubjectDetail(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllClass: () => dispatch(fetchAllClass()),
  fetchAllSubject: () => dispatch(fetchAllsubject()),
  fetchSubject: id => dispatch(fetchSubject(id)),
  resetForm: () => dispatch(reset('subjectForm')),
  saveSubject: data => dispatch(saveSubject(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SubjectInfo);
