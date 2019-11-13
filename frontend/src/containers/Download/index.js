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

  render() {
    const { classes, selectedClass, subjects } = this.props;
    const { questionPayload, inProgress, questionType, status } = this.state;
    console.log('inProgress', inProgress);

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
          <PdfComponent
            questionType={questionType}
            questionPayload={fromJS(questionPayload)}
          />
        )}
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
