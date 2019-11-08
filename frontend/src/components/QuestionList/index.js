import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { McqType } from 'containers/CreateQuestion/Question';
import { splitStringForContent, extractNameObject } from 'utils/utils';

class QuestionList extends Component {
  static propTypes = {
    allMcqs: PropTypes.any,
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    status: PropTypes.string,
  };

  createDataForTable = (allMcqs, allChapter, allClass, allSubject) => {
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
                ? 'Pending Mcq List'
                : status === QuestionStatusType.APPROVED
                ? 'Approved Mcq List'
                : 'Rejected Mcq List'}
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
