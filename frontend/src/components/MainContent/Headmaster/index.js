import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';

const Home = () => <h1>Home</h1>;
const Profile = () => <h1>Profile</h1>;
const ManageTeacher = () => <h1>Manage Teacher</h1>;
const CreateQuestions = () => <h1>Create Question</h1>;
const Download = () => <h1>Download</h1>;

class AdminContent extends Component {
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
            path="/manage-teacher"
            component={Authorization(ManageTeacher, [Roles.HEADMASTER])}
          />
          <Route
            exact
            path="/create-question"
            component={Authorization(CreateQuestions, [Roles.HEADMASTER])}
          />
          <Route
            exact
            path="/download-question"
            component={Authorization(Download, [Roles.HEADMASTER])}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminContent);
