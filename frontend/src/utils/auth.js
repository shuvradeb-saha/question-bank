import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeAuthenticated } from 'state/login/selectors';
import Login from '../containers/Login';

export const Authorization = (WrappedComponent, allowedRoles) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      authenticated: false,
    };

    render() {
      const { authenticated } = this.props;
      console.log('props in auth ', this.props);
      console.log('auth ', authenticated);

      if (!authenticated) {
        return <Login />;
      } else {
        return <div>welcome</div>;
      }
      /* console.log('allowed roles ', allowedRoles);
      if (allowedRoles.some(r => role.indexOf(r) >= 0)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>Access Denied</h1>;
      } */
    }
  }

  const mapStateToProps = createStructuredSelector({
    authenticated: makeAuthenticated(),
  });

  const withConnect = connect(
    mapStateToProps,
    null
  );
  return compose(withConnect)(WithAuthorization);
};
