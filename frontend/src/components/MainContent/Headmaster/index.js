import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import QuestionRoute from 'components/MainContent/QuestionRoute';
import { TeacherManagement, CreateQuestion } from 'containers';
import { TableType } from 'containers/TeacherManagement/TableType';

const Home = () => <h1>Home</h1>;
const Profile = () => <h1>Profile</h1>;

const Download = () => <h1>Download</h1>;

class HeadmasterContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/profile"
            component={Authorization(Profile, [Roles.HEADMASTER])}
          />
          <Route
            exact
            path="/approved-teacher"
            component={Authorization(
              () => (
                <TeacherManagement type={TableType.APPROVED} />
              ),
              [Roles.HEADMASTER]
            )}
          />

          <Route
            exact
            path="/pending-teacher"
            component={Authorization(
              () => (
                <TeacherManagement type={TableType.PENDING} />
              ),
              [Roles.HEADMASTER]
            )}
          />

          <Route
            exact
            path="/create-question"
            component={Authorization(CreateQuestion, [Roles.HEADMASTER])}
          />
          <Route
            exact
            path="/download-question"
            component={Authorization(Download, [Roles.HEADMASTER])}
          />
          <QuestionRoute />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(HeadmasterContent);
