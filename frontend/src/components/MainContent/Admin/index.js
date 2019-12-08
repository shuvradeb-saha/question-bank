import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';
import {
  UserInfo,
  InstituteInfo,
  ClassInfo,
  SubjectInfo,
  ChapterInfo,
  LandingPage,
} from 'containers';

class AdminContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />

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
          <Route
            exact
            path="/manage-chapter"
            component={Authorization(ChapterInfo, [Roles.ADMIN])}
          />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminContent);
