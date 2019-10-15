import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import { McqManager, McqType } from 'containers/CreateQuestion/Question';

const CQ = () => <h1>CQ Question</h1>;

class QuestionRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/stem-mcq"
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.STEM} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path={`/general-mcq`}
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.GENERAL} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/polynomial-mcq"
            component={Authorization(
              () => (
                <McqManager mcqType={McqType.POLYNOMIAL} />
              ),
              [Roles.HEADMASTER, Roles.TEACHER]
            )}
          />
          <Route
            exact
            path="/cq"
            component={Authorization(CQ, [Roles.HEADMASTER, Roles.TEACHER])}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(QuestionRoute);
