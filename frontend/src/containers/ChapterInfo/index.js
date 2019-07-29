/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { ChapterRegisterModal } from 'components/Modals';
import { fetchAllsubject, fetchAllClass } from 'state/admin/action';
import { makeClasses, makeSubjects } from 'state/admin/selectors';

class ChapterInfo extends Component {
  static propTypes = {
    chapterDetails: PropTypes.object,
    chapters: PropTypes.object,
    classes: PropTypes.object,
    fetchAllClass: PropTypes.func,
    fetchAllSubject: PropTypes.func,
    fetchInstitute: PropTypes.func,
    resetForm: PropTypes.func,
    saveChapter: PropTypes.func,
    subjects: PropTypes.object,
  };

  static defaultProps = {
    classes: [],
    subjects: [],
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

  onChapterSubmit = values => {
    console.log('values => ', values.toJS());
    //this.props.saveInstitute(values.toJS());
  };

  onEditClick = id => {
    this.props.fetchInstitute(id);
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

  createDataForTable = () => {
    const { chapters } = this.props;
    const columns = [
      {
        label: 'Institute Name',
        field: 'instituteName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'EIIN Number',
        field: 'eiinNumber',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = chapters.map(institute => ({
      instituteName: institute.get('name'),
      eiinNumber: institute.get('eiinNumber'),
      action: (
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => this.onEditClick(institute.get('id'))}
        >
          Edit
        </button>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    const { classes, subjects } = this.props;
    console.log('classes', classes.toJS());

    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create Institute
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/*   <MDBDataTable
              striped
              bordered
              small
              data={''} //this.createDataForTable()
            /> */}
          </div>
        </div>
        <ChapterRegisterModal
          classes={classes}
          subjects={subjects}
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.onCreateClick}
          onSubmit={this.onChapterSubmit}
          initialValues={this.state.edit ? this.props.chapterDetails : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  classes: makeClasses(),
  subjects: makeSubjects(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllClass: () => dispatch(fetchAllClass()),
  fetchAllSubject: () => dispatch(fetchAllsubject()),
  resetForm: () => dispatch(reset('chapterForm')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ChapterInfo);
