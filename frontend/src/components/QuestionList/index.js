import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { McqType } from 'containers/CreateQuestion/Question';
import { splitStringForContent, extractNameObject } from 'utils/utils';
import { toastError, toastSuccess } from '../Toaster';
import API from 'utils/api';

class QuestionList extends Component {
  static propTypes = {
    allMcqs: PropTypes.any,
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    status: PropTypes.string,
  };

  onDeleteClick = async id => {
    if (window.confirm('Are you sure to delete the MCQ?')) {
      const uri = `/api/teacher/question/mcq/${id}`;
      try {
        await API.delete(uri);
        toastSuccess('MCQ has deleted');
        this.props.history.push('/question/mcq/rejected');
      } catch (error) {
        console.log('error', error);
        toastError('error.response.data');
      }
    } else {
      return;
    }
  };

  createDataForTable = (allMcqs, allChapter, allClass, allSubject) => {
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
        field: 'mcq',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Mcq type',
        field: 'mcqType',
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

    const rows = allMcqs.map(mcq => {
      const mcqType = mcq.get('mcqType');
      let contentToShow = '';
      if (mcqType === McqType.GENERAL) {
        const mainStr = mcq.get('questionBody');
        contentToShow = mainStr && splitStringForContent(mainStr);
      } else if (mcqType === McqType.POLYNOMIAL) {
        const mainStr = mcq.get('questionStatement');
        contentToShow = mainStr && splitStringForContent(mainStr);
      } else {
        const mainStr = mcq.get('stem');
        contentToShow = mainStr && splitStringForContent(mainStr);
      }

      const nameObject = extractNameObject(
        mcq.get('chapterId'),
        allChapter,
        allClass,
        allSubject
      );

      const rejectExtraObj =
        status !== QuestionStatusType.REJECTED
          ? {}
          : {
              cause:
                mcq.get('rejectedCause') == null ? (
                  <div className="text-justify">No Comment</div>
                ) : (
                  <div className="text-justify">{mcq.get('rejectedCause')}</div>
                ),
              action: (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.onDeleteClick(mcq.get('id'))}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              ),
            };
      const createdAt = moment(mcq.get('createdAt')).format('YYYY-MM-DD');
      return {
        mcq: (
          <Link to={`/mcq/${mcq.get('id')}`} style={{ color: 'blue' }}>
            {contentToShow}
          </Link>
        ),
        mcqType,
        ...nameObject,
        createdAt,
        ...rejectExtraObj,
      };
    });

    return { columns, rows: rows.toJS() };
  };

  render() {
    const { status, allMcqs, allChapter, allClass, allSubject } = this.props;

    return (
      <span>
        <div className="card">
          <div className={`card-header bg-dark text-light`}>
            <b>
              {status === QuestionStatusType.PENDING
                ? 'Pending MCQs Submitted by Yourself'
                : status === QuestionStatusType.APPROVED
                ? 'Approved MCQs Submitted by Yourself'
                : 'Rejected MCQs Submitted by Yourself'}
            </b>
          </div>
          <div className="card-body">
            {allMcqs.size === 0 ? (
              <h5>No MCQ Available</h5>
            ) : (
              <MDBDataTable
                small
                data={this.createDataForTable(
                  allMcqs,
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
