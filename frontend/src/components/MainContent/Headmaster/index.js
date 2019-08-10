import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { Authorization } from 'utils/auth';

import { Roles } from 'containers/App/constants';
import { NotFound } from 'components';

const Home = () => <h1>Home</h1>;
const Profile = () => <h1>Profile</h1>;
const ManageTeacher = () => <h1>Manage Teacher</h1>;
const CreateQuestions = () => (
  <div className="jumbotron">
    <div>
      <div>
        <b>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
          <span style={{ marginLeft: 5 }}>
            MCQ (Multiple Choice Question/বহুনির্বাচনী প্রশ্ন)
          </span>
        </b>
        <ul>
          <li>
            <Link to="#">General MCQ (সাধারণ বহুনির্বাচনী প্রশ্ন)</Link>
          </li>
          <li>
            <Link to="#">
              Polynomial MCQ (বহুপদীসমাপ্তিসূচক বহুনির্বাচনী প্রশ্ন)
            </Link>
          </li>
          <li>
            <Link to="#">
              Stem Based MCQ (উদ্দীপকভিত্তিক বহুনির্বাচনী প্রশ্ন)
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <b>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        <span style={{ marginLeft: 5 }}>
          CQ (Creative Question/সৃজনশীল প্রশ্ন)
          <ul>
            <li>
              <Link to="#">Create CQ</Link>
            </li>
          </ul>
        </span>
      </b>
    </div>
  </div>
);
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
