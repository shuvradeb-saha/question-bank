import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  makeAllClasses,
  makeAllSubjects,
  makeUserId,
} from 'state/login/selectors';
import { fetchArchive } from 'state/headmaster/action';
import { makeArchiveItems } from 'state/headmaster/selectors';
import { getNameById, getClassNameBySubjectId } from 'utils/utils';
import API from 'utils/api';
import { toastSuccess, toastError } from 'components/Toaster';
class DownloadArchive extends Component {
  static propTypes = {
    userId: PropTypes.number,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    fetchArchive: PropTypes.func,
    archiveItems: PropTypes.any,
  };

  componentDidMount() {
    this.props.fetchArchive(this.props.userId);
  }
  onDownloadClick = async (questionType, paperId) => {
    try {
      let anchor = document.createElement('a');
      document.body.appendChild(anchor);
      let file = `${process.env.REACT_APP_API_PREFIX}api/headmaster/download/${questionType}/${paperId}`;

      let headers = new Headers();
      headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

      fetch(file, { headers })
        .then(response => response.blob())
        .then(blobby => {
          let objectUrl = window.URL.createObjectURL(blobby);
          anchor.href = objectUrl;
          anchor.download = 'question-answer-file.zip';
          anchor.click();

          window.URL.revokeObjectURL(objectUrl);
        });
    } catch (error) {
      console.log('Error', error);
      toastError('Unable to download.');
    }
  };

  createDataForTable = () => {
    const { archiveItems, classes, subjects } = this.props;
    const columns = [
      {
        label: 'Class',
        field: 'cls',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Subject',
        field: 'subject',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Question Type',
        field: 'questionType',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Exam Type',
        field: 'examType',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Creation Date',
        field: 'creationDate',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = archiveItems.map(item => ({
      cls: getClassNameBySubjectId(item.get('subjectId'), classes, subjects),
      subject: getNameById(item.get('subjectId'), subjects),
      questionType: item.get('type'),
      examType: item.get('examType'),
      creationDate: moment(item.get('createdAt')).format('YYYY-MM-DD'),
      action: (
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => this.onDownloadClick(item.get('type'), item.get('id'))}
        >
          Download
        </button>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <MDBDataTable striped bordered data={this.createDataForTable()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: makeUserId(),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
  archiveItems: makeArchiveItems(),
});

const mapDispatchToProps = dispatch => ({
  fetchArchive: id => dispatch(fetchArchive(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(DownloadArchive);
