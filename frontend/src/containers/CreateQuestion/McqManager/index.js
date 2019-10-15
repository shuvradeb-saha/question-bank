import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';

import { makeAllClasses, makeAllSubjects } from 'state/login/selectors';

import { McqForm } from 'components/QuestionForm';

const allocateSubjectFormSelector = formValueSelector('mcqForm');

class McqManager extends Component {
  static propTypes = {
    mcqType: PropTypes.string.isRequired,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
  };

  render() {
    const { classes, subjects, selectedClass, mcqType } = this.props;

    return (
      <div>
        <McqForm
          mcqType={mcqType}
          subjects={subjects}
          classes={classes}
          selectedClass={selectedClass}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedClass: state => allocateSubjectFormSelector(state, 'class'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(McqManager);
