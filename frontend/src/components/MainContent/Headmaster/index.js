import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import QuestionRoute from 'components/MainContent/QuestionRoute';
import {
  TeacherManagement,
  CreateQuestion,
  McqModeration,
  CqModeration,
  LandingPage,
  Download,
  Profile,
} from 'containers';
import { TableType } from 'containers/TeacherManagement/TableType';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';

class MixContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={Authorization(LandingPage, [
              Roles.HEADMASTER,
              Roles.ADMIN,
              Roles.MODERATOR,
              Roles.TEACHER,
            ])}
          />
          <Route
            exact
            path="/profile"
            component={Authorization(Profile, [
              Roles.HEADMASTER,
              Roles.ADMIN,
              Roles.MODERATOR,
              Roles.TEACHER,
            ])}
          />
          <Route
            exact
            path="/teacher/approved"
            component={Authorization(
              () => (
                <TeacherManagement type={TableType.APPROVED} />
              ),
              [Roles.HEADMASTER]
            )}
          />
          <Route
            exact
            path="/teacher/pending"
            component={Authorization(
              () => (
                <TeacherManagement type={TableType.PENDING} />
              ),
              [Roles.HEADMASTER]
            )}
          />
          <Route
            exact
            path="/question/create"
            component={Authorization(CreateQuestion, [
              Roles.HEADMASTER,
              Roles.MODERATOR,
              Roles.TEACHER,
            ])}
          />
          <Route
            exact
            path="/download/paper"
            component={Authorization(Download, [Roles.HEADMASTER])}
          />
          <Route
            exact
            path="/moderate/mcq/pending"
            component={Authorization(
              () => (
                <McqModeration type={QuestionStatusType.PENDING} />
              ),
              [Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/moderate/mcq/approved"
            component={Authorization(
              () => (
                <McqModeration type={QuestionStatusType.APPROVED} />
              ),
              [Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/moderate/mcq/rejected"
            component={Authorization(
              () => (
                <McqModeration type={QuestionStatusType.REJECTED} />
              ),
              [Roles.MODERATOR]
            )}
          />

          <Route
            exact
            path="/moderate/cq/pending"
            component={Authorization(
              () => (
                <CqModeration type={QuestionStatusType.PENDING} />
              ),
              [Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/moderate/cq/approved"
            component={Authorization(
              () => (
                <CqModeration type={QuestionStatusType.APPROVED} />
              ),
              [Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/moderate/cq/rejected"
            component={Authorization(
              () => (
                <CqModeration type={QuestionStatusType.REJECTED} />
              ),
              [Roles.MODERATOR]
            )}
          />
          <QuestionRoute />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MixContent);
