import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form/immutable';

import { DownloadCriteria } from 'components';
import { PdfComponent } from 'containers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeAllClasses,
  makeAllSubjects,
  makeUserId,
} from 'state/login/selectors';
import API from 'utils/api';
import { toastSuccess, toastError } from 'components/Toaster';
import { fromJS } from 'immutable';
import { zip } from 'rxjs/operators';

const downloadFormSelector = formValueSelector('downloadForm');
class Download extends Component {
  static propTypes = {
    userId: PropTypes.number,
    classes: PropTypes.object,
    chapters: PropTypes.object,
    selectedClass: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      questionPayload: [],
      questionType: '',
      status: false,
    };
  }

  onSubmit = async values => {
    const jsValue = values.toJS();
    const questionType = jsValue.questionType.value;
    const data = {
      teacherId: this.props.userId,
      ...jsValue,
      classId: jsValue.classId.value,
      subjectId: jsValue.subjectId.value,
      examType: jsValue.examType.value,
      questionType,
    };

    this.setState({ questionType, inProgress: true });
    const uri = '/api/headmaster/generate/paper';
    //    console.log('data', data);
    try {
      const questionPayload = await API.post(uri, data);
      this.setState({
        questionType,
        inProgress: false,
        questionPayload,
        status: true,
      });

      toastSuccess('Question generation succedded.');
    } catch (error) {
      toastError(error.response.data.message);
      this.setState({
        questionType: '',
        inProgress: false,
        questionPayload: [],
        status: false,
      });
    }
  };

  onDownloadClick = async () => {
    try {
      let anchor = document.createElement('a');
      document.body.appendChild(anchor);
      let file = `${process.env.REACT_APP_API_PREFIX}api/headmaster/download/MCQ/29`;

      let headers = new Headers();
      headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby);

          anchor.href = objectUrl;
          anchor.download = 'question-answer-file.zip';
          anchor.click();

          window.URL.revokeObjectURL(objectUrl);
        });
    } catch (error) {
      console.log('Error', error);
    }
  };

  render() {
    const { classes, selectedClass, subjects } = this.props;
    const { questionPayload, inProgress, questionType, status } = this.state;

    return (
      <div>
        <DownloadCriteria
          classes={classes}
          subjects={subjects}
          selectedClass={selectedClass}
          onSubmit={this.onSubmit}
          inProgress={inProgress}
          status={status}
        />
        {status && (
          <button className="btn btn-lg" onClick={this.onDownloadClick}>
            <i className="fa fa-download" aria-hidden="true"></i>&nbsp;Download
          </button>
        )}
        <button className="btn btn-lg" onClick={this.onDownloadClick}>
          <i className="fa fa-download" aria-hidden="true"></i>&nbsp;Download
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: makeUserId(),
  selectedClass: state => downloadFormSelector(state, 'classId'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Download);
