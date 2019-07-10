import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userIsAuthenticated } from 'utils/reduxAuth';
import HomePage from '../Home';

import { fetchCurrentUserProfile } from 'state/login/action';
import { makeAuthenticated } from 'state/login/selectors';

import Login from '../Login';

const NOT_FOUND = () => <h1>Not Found</h1>;

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    fetchCurrentUserProfile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    authenticated: false,
  };

  componentDidMount = () => {
    const { authenticated, fetchCurrentUserProfile } = this.props;
    console.log('came');
    if (!authenticated) {
      fetchCurrentUserProfile();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.locationHasBeenUpdated(prevProps.location, this.props.location)) {
      window.scrollTo(0, 0);
    }
  }

  locationHasBeenUpdated = (prevLocation, newLocation) => {
    if (prevLocation && newLocation) {
      /* From observation, it seems that the key always changes even if user loads the same url again.*/
      if (prevLocation.key !== newLocation.key) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={userIsAuthenticated(HomePage)} />

          <Route path="" component={NOT_FOUND} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authenticated: makeAuthenticated(),
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserProfile: () => dispatch(fetchCurrentUserProfile()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(withConnect(App));
