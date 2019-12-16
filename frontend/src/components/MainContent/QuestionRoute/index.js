import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import {
  McqStatusManagement,
  McqViewer,
  CqViewer,
  ModerateMcqViewer,
  ModeratorCqViewer,
  Dashboard,
  CqStatusManager,
} from 'containers';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import {
  McqManager,
  McqType,
  CqManager,
} from 'containers/CreateQuestion/Question';

class QuestionRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/question/mcq/stem"
            component={Authorization(
              () => (
                <McqManager
                  mcqType={McqType.STEM}
                  history={this.props.history}
                />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path={`/question/mcq/general`}
            component={Authorization(
              () => (
                <McqManager
                  mcqType={McqType.GENERAL}
                  history={this.props.history}
                />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/mcq/polynomial"
            component={Authorization(
              () => (
                <McqManager
                  mcqType={McqType.POLYNOMIAL}
                  history={this.props.history}
                />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/mcq/pending"
            component={Authorization(
              () => (
                <McqStatusManagement type={QuestionStatusType.PENDING} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/mcq/approved"
            component={Authorization(
              () => (
                <McqStatusManagement type={QuestionStatusType.APPROVED} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/mcq/rejected"
            component={Authorization(
              () => (
                <McqStatusManagement
                  history={this.props.history}
                  type={QuestionStatusType.REJECTED}
                />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />

          <Route
            exact
            path="/question/cq"
            component={Authorization(CqManager, [
              Roles.HEADMASTER,
              Roles.TEACHER,
              Roles.MODERATOR,
            ])}
          />

          <Route
            exact
            path="/question/cq/pending"
            component={Authorization(
              () => (
                <CqStatusManager type={QuestionStatusType.PENDING} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/cq/approved"
            component={Authorization(
              () => (
                <CqStatusManager type={QuestionStatusType.APPROVED} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />
          <Route
            exact
            path="/question/cq/rejected"
            component={Authorization(
              () => (
                <CqStatusManager
                  history={this.props.history}
                  type={QuestionStatusType.REJECTED}
                />
              ),
              [Roles.HEADMASTER, Roles.TEACHER, Roles.MODERATOR]
            )}
          />

          <Route
            path="/mcq/:id"
            component={Authorization(McqViewer, [
              Roles.HEADMASTER,
              Roles.TEACHER,
              Roles.MODERATOR,
            ])}
          />
          <Route
            path="/cq/:id"
            component={Authorization(CqViewer, [
              Roles.HEADMASTER,
              Roles.TEACHER,
              Roles.MODERATOR,
            ])}
          />

          <Route
            path="/moderate/mcq/:id"
            component={Authorization(ModerateMcqViewer, [Roles.MODERATOR])}
          />
          <Route
            path="/moderate/cq/:id"
            component={Authorization(ModeratorCqViewer, [Roles.MODERATOR])}
          />
          <Route
            path="/dashboard"
            component={Authorization(Dashboard, [
              Roles.TEACHER,
              Roles.HEADMASTER,
              Roles.MODERATOR,
            ])}
          />

          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(QuestionRoute);
