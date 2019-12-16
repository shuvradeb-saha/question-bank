import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { splitStringForContent, extractNameObject } from 'utils/utils';
import { toastError, toastSuccess } from '../Toaster';
import API from 'utils/api';

class QuestionList extends Component {
  static propTypes = {
    allCqs: PropTypes.any,
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    status: PropTypes.string,
  };

  onDeleteClick = async id => {
    if (window.confirm('Are you sure to delete the MCQ?')) {
      const uri = `/api/teacher/question/cq/${id}`;
      try {
        await API.delete(uri);
        toastSuccess('Question deleted');
        this.props.history.push('/question/cq/rejected');
      } catch (error) {
        console.log('error', error);
        toastError('Can not delete');
      }
    } else {
      return;
    }
  };

  createDataForTable = (allCqs, allChapter, allClass, allSubject) => {
    const status = this.props.status;
    const rejectExtra =
      status !== QuestionStatusType.REJECTED
        ? []
        : [
            {
              label: 'Cause',
              field: 'cause',
              sort: 'asc',
              width: 100,
            },
            {
              label: 'Action',
              field: 'action',
              sort: 'asc',
              width: 100,
            },
          ];
    const columns = [
      {
        label: 'Question',
        field: 'cq',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Class',
        field: 'className',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Subject',
        field: 'subjectName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Chapter',
        field: 'chapterName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Created at',
        field: 'createdAt',
        sort: 'asc',
        width: 100,
      },
      ...rejectExtra,
    ];

    const rows = allCqs.map(cq => {
      const mainStr = cq.get('stem');
      const contentToShow = (mainStr && splitStringForContent(mainStr)) || '';

      const nameObject = extractNameObject(
        cq.get('chapterId'),
        allChapter,
        allClass,
        allSubject
      );
      const rejectExtraObj =
        status !== QuestionStatusType.REJECTED
          ? {}
          : {
              cause:
                cq.get('rejectCause') == null ? (
                  <div className="text-justify">No Comment</div>
                ) : (
                  <div className="text-justify">{cq.get('rejectCause')}</div>
                ),
              action: (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.onDeleteClick(cq.get('id'))}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              ),
            };
      const createdAt = moment(cq.get('createdAt')).format('YYYY-MM-DD');
      return {
        cq: (
          <Link to={`/cq/${cq.get('id')}`} style={{ color: 'blue' }}>
            {contentToShow}
          </Link>
        ),
        ...nameObject,
        createdAt,
        ...rejectExtraObj,
      };
    });

    return { columns, rows: rows.toJS() };
  };

  render() {
    const { status, allCqs, allChapter, allClass, allSubject } = this.props;

    return (
      <span>
        <div className="card">
          <div className={`card-header bg-dark text-light`}>
            <b>
              {status === QuestionStatusType.PENDING
                ? 'Pending CQs Submitted by Yourself'
                : status === QuestionStatusType.APPROVED
                ? 'Approved CQs Submitted by Yourself'
                : 'Rejected CQs Submitted by Yourself'}
            </b>
          </div>
          <div className="card-body">
            {allCqs.size === 0 ? (
              <h5>No CQ Available</h5>
            ) : (
              <MDBDataTable
                small
                data={this.createDataForTable(
                  allCqs,
                  allChapter,
                  allClass,
                  allSubject
                )}
              />
            )}
          </div>
        </div>
      </span>
    );
  }
}

export default QuestionList;
