import React, { Component } from 'react';

import Header from '../Header';
import SideBar from '../SideBar';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
              <h1>Body </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
