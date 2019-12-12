/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from 'utils/api';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeUserId, makeRoles } from 'state/login/selectors';
import { Bar, Pie } from 'react-chartjs-2';

class Dashboard extends Component {
  static propTypes = {
    userId: PropTypes.number,
    roles: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { inProgress: false, data: {} };
  }

  async componentDidMount() {
    try {
      this.setState({ inProgress: true });
      const data = await API.get(`/api/teacher/data/${this.props.userId}`);
      this.setState({ inProgress: false, data });
    } catch (error) {
      this.setState({ inProgress: false });
    }
  }

  preparePieData = (mcq, cq) => ({
    labels: ['Total MCQ', 'Total CQ'],
    datasets: [
      {
        label: 'Created MCQ',
        data: [mcq, cq],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  });

  prepareBarChartData = (label, object, colorBg, colorHover) => {
    if (object) {
      const labels = Object.keys(object);
      const values = Object.values(object);

      return {
        labels: labels,
        datasets: [
          {
            label: label,
            backgroundColor: colorBg,
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: colorHover,
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: values,
          },
        ],
      };
    } else {
      return {};
    }
  };

  render() {
    const data = this.state.data;

    const isHeadMaster = this.props.roles.includes('HEADMASTER');
    const isModerator = this.props.roles.includes('MODERATOR');

    const createdMcq = data && data.createdMcqMap;
    const createdCq = data && data.createdCqMap;

    return this.state.inProgress ? (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Loader type="RevolvingDot" color="blue" width="200" height="300" />
          </div>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="row">
          {isHeadMaster && (
            <div className="col-3">
              <div className="bg-info p-3 text center rounded">
                <h4>Total Teacher</h4>
                <h2>{data.totalTeacher}</h2>
              </div>
            </div>
          )}
          <div className="col-3">
            <div className="bg-light-green p-3 text center rounded">
              <h4>Total Created</h4>
              <h2>{data.totalCreated}</h2>
            </div>
          </div>
          {isModerator && (
            <div className="col-3">
              <div className="bg-purple p-3 text center rounded">
                <h4>Total Moderated</h4>
                <h2>{data.totalModerated}</h2>
              </div>
            </div>
          )}
        </div>
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>Created Questions</h2>
            <div>
              {data.createdMcqCount === 0 && data.createdCqCount === 0 ? (
                <h2>No question has been created yet.</h2>
              ) : (
                <Pie
                  data={this.preparePieData(
                    data.createdMcqCount,
                    data.createdCqCount
                  )}
                  width={400}
                  height={400}
                  options={{ maintainAspectRatio: false }}
                />
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>Last Six Month MCQ</h2>
            <div>
              <Bar
                data={this.prepareBarChartData(
                  'Created MCQ',
                  createdMcq,
                  '#e08989',
                  '#e86f6f'
                )}
                width={300}
                height={400}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col text-center">
            <h2>Last Six Month CQ</h2>
            <div>
              <Bar
                data={this.prepareBarChartData(
                  'Created CQ',
                  createdCq,
                  '#5881e8',
                  '#5a7e9e'
                )}
                width={300}
                height={400}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        {isModerator && (
          <div className="row">
            <div className="col text-center">
              <h2>Moderated Questions</h2>
              <div>
                {data.moderatedMcqCount === 0 && data.moderatedCqCount === 0 ? (
                  <h2>No question has been created yet.</h2>
                ) : (
                  <Pie
                    data={this.preparePieData(
                      data.moderatedMcqCount,
                      data.moderatedCqCount
                    )}
                    width={400}
                    height={400}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: makeUserId(),
  roles: makeRoles(),
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default withConnect(Dashboard);
