import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';

const StemMcq = () => <h1>Stem Based MCQ</h1>;
const GeneralMcq = () => <h1>General Based MCQ</h1>;
const PolynomialMcq = () => <h1>Polynomial Based MCQ</h1>;
const CQ = () => <h1>CQ Question</h1>;

class QuestionRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/stem-mcq"
            component={Authorization(StemMcq, [
              Roles.HEADMASTER,
              Roles.TEACHER,
            ])}
          />
          <Route
            exact
            path={`/general-mcq`}
            component={Authorization(GeneralMcq, [
              Roles.HEADMASTER,
              Roles.TEACHER,
            ])}
          />
          <Route
            exact
            path="/polynomial-mcq"
            component={Authorization(PolynomialMcq, [
              Roles.HEADMASTER,
              Roles.TEACHER,
            ])}
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
