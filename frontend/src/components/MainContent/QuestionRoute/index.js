import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import { QuestionStatusManagement } from 'containers';
import { QuestionStatusType } from 'containers/QuestionStatusManager/StatusType';
import { McqManager, McqType } from 'containers/CreateQuestion/Question';

const CQ = () => <h1>CQ Question</h1>;

class QuestionRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/question-mcq-stem"
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.STEM} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path={`/question-mcq-general`}
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.GENERAL} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/question-mcq-polynomial"
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.POLYNOMIAL} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/question-pending"
            component={Authorization(
              () => (
                <QuestionStatusManagement type={QuestionStatusType.PENDING} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/question-approved"
            component={Authorization(
              () => (
                <QuestionStatusManagement type={QuestionStatusType.PENDING} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/question-rejected"
            component={Authorization(
              () => (
                <QuestionStatusManagement type={QuestionStatusType.APPROVED} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/question-cq"
            component={Authorization(CQ, [Roles.HEADMASTER, Roles.TEACHER])}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(QuestionRoute);
