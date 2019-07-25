import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import { UserInfo, InstituteInfo, ClassInfo } from 'containers';

const Home = () => <h1 className="text-center">Welcome to your Portal</h1>;
const Profile = () => <h1>Profile</h1>;
const SubjectInfo = () => <h1>SubjectInfo</h1>;

class AdminContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/profile"
            component={Authorization(Profile, [Roles.ADMIN])}
          />
          <Route
            exact
            path="/manage-user"
            component={Authorization(UserInfo, [Roles.ADMIN])}
          />
          <Route
            exact
            path="/manage-institute"
            component={Authorization(InstituteInfo, [Roles.ADMIN])}
          />
          <Route
            exact
            path="/manage-class"
            component={Authorization(ClassInfo, [Roles.ADMIN])}
          />
          <Route
            exact
            path="/manage-subject"
            component={Authorization(SubjectInfo, [Roles.ADMIN])}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminContent);
