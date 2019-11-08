import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { makeAuthenticated, makeRoles } from 'state/login/selectors';
import { AccessDenied } from 'components';

export const Authorization = (WrappedComponent, allowedRoles) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      roles: ImmutablePropTypes.list.isRequired,
    };

    static defaultProps = {
      authenticated: false,
      roles: [],
    };

    render() {
      const { roles } = this.props;

      if (allowedRoles.some(r => roles.indexOf(r) >= 0)) {
        return <WrappedComponent {...this.props} />;
      } else {
        console.log('came');

        return <AccessDenied />;
      }
    }
  }

  const mapStateToProps = createStructuredSelector({
    authenticated: makeAuthenticated(),
    roles: makeRoles(),
  });

  const withConnect = connect(
    mapStateToProps,
    null
  );
  return compose(withConnect)(WithAuthorization);
};
