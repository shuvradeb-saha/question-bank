import React, { Component } from 'react';

class AccessDenied extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="alert-danger p-3">
              <h1>
                Access Denied <i className="fa fa-ban" aria-hidden="true"></i>
              </h1>
              <h2>Sorry, you do not have permission to view this page.</h2>
              <h3>Please logout and re-login as valid user.</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccessDenied;
