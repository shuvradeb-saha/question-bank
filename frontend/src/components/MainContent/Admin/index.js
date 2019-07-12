import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';

const RSS = () => <h1>Rss</h1>;
const CHAT = () => <h1>Chat</h1>;

class AdminContent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/rss"
            component={Authorization(RSS, [Roles.TEACHER])}
          />
          <Route exact path="/chat" component={CHAT} />
          <Route path="" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminContent);
