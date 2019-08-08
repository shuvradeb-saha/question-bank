/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from 'mdbreact';
import { formValueSelector } from 'redux-form/immutable';
import { reset } from 'redux-form';

import { ChapterRegisterModal } from 'components/Modals';
import {
  fetchAllsubject,
  fetchAllClass,
  fetchAllChapters,
  fetchChapter,
  saveChapter,
} from 'state/admin/action';

import {
  makeClasses,
  makeSubjects,
  makeChapter,
  makeAllChapters,
} from 'state/admin/selectors';

const selector = formValueSelector('chapterForm');
class ChapterInfo extends Component {
  static propTypes = {
    allChapters: PropTypes.object,
    chapterDetails: PropTypes.object,
    classes: PropTypes.object,
    fetchAllClass: PropTypes.func,
    fetchAllSubject: PropTypes.func,
    fetchInstitute: PropTypes.func,
    fetchAllChapters: PropTypes.func,
    fetchChapter: PropTypes.func,
    resetForm: PropTypes.func,
    saveChapter: PropTypes.func,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
  };

  static defaultProps = {
    classes: [],
    subjects: [],
    allChapters: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount() {
    const { fetchAllClass, fetchAllChapters, fetchAllSubject } = this.props;
    fetchAllChapters();
    fetchAllClass();
    fetchAllSubject();
  }

  onChapterSubmit = values => {
    const chapterData = values.toJS();
    let learningOutcome = [];
    console.log('chapter data', chapterData);

    const learningOutcomes = chapterData.learningOutcomes;
    if (learningOutcomes) {
      learningOutcomes.forEach(l => learningOutcome.push(l));
    }

    const dataToSave = {
      classId: parseInt(chapterData.class.value, 10),
      subjectId: parseInt(chapterData.subject.value, 10),
      chapterName: chapterData.name,
      learningOutcome,
    };

    this.props.saveChapter(dataToSave);
  };

  onEditClick = id => {
    this.props.fetchChapter(id);
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

  getNameById = (id, data) => {
    const filteredItem = data.filter(item => item.get('id') === id);
    return filteredItem && filteredItem.size > 0
      ? filteredItem.get(0).toJS().name
      : '';
  };

  createDataForTable = () => {
    const { allChapters, subjects, classes } = this.props;

    const columns = [
      {
        label: 'Chapter Name',
        field: 'chapterName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Class ',
        field: 'className',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Subject',
        field: 'subject',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = allChapters.map(chapter => {
      return {
        chapterName: chapter.get('chapterName'),
        className: this.getNameById(chapter.get('classId'), classes),
        subject: this.getNameById(chapter.get('subjectId'), subjects),
        action: (
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() => this.onEditClick(chapter.get('id'))}
          >
            Edit
          </button>
        ),
      };
    });
    return { columns, rows: rows.toJS() };
  };

  prepareInitialValues = data => {
    const chapterDetails = data.toJS();
    const clasz = {
      label: this.getNameById(chapterDetails.classId, this.props.classes),
      value: chapterDetails.classId || '',
    };
    const subject = {
      label: this.getNameById(chapterDetails.subjectId, this.props.subjects),
      value: chapterDetails.subjectId || '',
    };

    return {
      class: clasz,
      subject,
      name: chapterDetails.chapterName,
      learningOutcomes: chapterDetails.learningOutcome,
    };
  };

  render() {
    const { classes, subjects, selectedClass } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create Chapter
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
        <ChapterRegisterModal
          classes={classes}
          subjects={subjects}
          selectedClass={selectedClass}
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.onCreateClick}
          onSubmit={this.onChapterSubmit}
          initialValues={
            this.state.edit
              ? this.prepareInitialValues(this.props.chapterDetails)
              : {}
          }
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allChapters: makeAllChapters(),
  classes: makeClasses(),
  chapterDetails: makeChapter(),
  subjects: makeSubjects(),
  selectedClass: state => selector(state, 'class'),
});

const mapDispatchToProps = dispatch => ({
  fetchAllClass: () => dispatch(fetchAllClass()),
  fetchAllSubject: () => dispatch(fetchAllsubject()),
  fetchAllChapters: () => dispatch(fetchAllChapters()),
  fetchChapter: id => dispatch(fetchChapter(id)),
  resetForm: () => dispatch(reset('chapterForm')),
  saveChapter: data => dispatch(saveChapter(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ChapterInfo);
