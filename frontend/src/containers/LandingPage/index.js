import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeUserName, makeRoles } from 'state/login/selectors';

const ItemCard = props => {
  const { header, body } = props;
  return (
    <div className="col-4 mt-2 card ">
      <div className="card-header  text-light bg-dark">{header}</div>
      <div className="card-body text-justify">{body}</div>
    </div>
  );
};

class LandingPage extends Component {
  static propTypes = { username: PropTypes.string, roles: PropTypes.any };

  render() {
    const { username, roles } = this.props;

    const userRole = roles.toJS();

    return (
      <div className="row">
        <div className="col-12 text-center">
          <div className="bg-dark card text-light p-3">
            <h3>Welcome to Question Bank, {username || 'Username'}</h3>
          </div>
          {userRole.includes('ADMIN') ? (
            <span>
              <div className="row ml-1 text-center">
                <ItemCard
                  header="Manage User"
                  body="You can create new user and edit their information. You can make a teacher moderator. 
                  You also can remove a teacher from moderatorship."
                />
                <ItemCard
                  header="Manage Subject or Class"
                  body="You can add new class, subject, chapters in the question bank. So that the users can use them further."
                />
                <ItemCard
                  header="Manage Institue"
                  body="You can create a new institute in the question bank. Each institute may then contains teachers of different roles."
                />
              </div>
            </span>
          ) : (
            <span>
              <div className="row ml-1 text-center">
                <ItemCard
                  header="Question Creation"
                  body="You can create MCQ and CQ question. In the MCQ section you can create three types of MCQ.
              Be careful while submitting question as you won't be able to edit question after submission."
                />
                <ItemCard
                  header="Question Status"
                  body="After creating question you can see the present status whether the 
              question has approved or rejected. Here you will get two section for MCQ and CQ. 
              Each section has three subsection pending, approved, rejected based on the status."
                />
                <ItemCard
                  header="Profile Management"
                  body="You can update your profile information. Upload profile photo. And also can change your password."
                />
              </div>
              <div className="row ml-1 text-center">
                {userRole.includes('HEADMASTER') && (
                  <ItemCard
                    header="Manage Teacher"
                    body="Can see all teachers of your institute. 
              Subject can be allocated to the teachers. You can
               also suspend a teacher by unallocating subject."
                  />
                )}
                {userRole.includes('HEADMASTER') && (
                  <ItemCard
                    header="Download Question"
                    body="You can generate new question from question bank. After that the question can be downloaded 
              as a zip file. You can also check your previous question papers."
                  />
                )}
                {userRole.includes('MODERATOR') && (
                  <ItemCard
                    header="Question Moderation"
                    body="You can see questions you have assigned for moderation. Perform action on them by approving or rejecting them. 
              Can view all question approved or rejected by yourself."
                  />
                )}
              </div>
            </span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeUserName(),
  roles: makeRoles(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(LandingPage);
