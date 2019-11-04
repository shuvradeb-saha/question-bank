import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { McqType } from 'containers/CreateQuestion/Question';

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
      let contentToShow = '',
        chapterName = '',
        subjectName = '',
        className = '';
      if (mcqType === McqType.GENERAL) {
        const mainStr = mcq.get('questionBody');
        contentToShow = mainStr && this.splitStringForContent(mainStr);
      } else if (mcqType === McqType.POLYNOMIAL) {
        const mainStr = mcq.get('questionStatement');
        contentToShow = mainStr && this.splitStringForContent(mainStr);
      } else {
        const mainStr = mcq.get('stem');
        contentToShow = mainStr && this.splitStringForContent(mainStr);
      }

      const filterdChapter = allChapter.filter(
        chp => chp.get('id') === mcq.get('chapterId')
      );
      if (filterdChapter && filterdChapter.get(0)) {
        const targetChapter = filterdChapter.get(0).toJS();

        chapterName = targetChapter.chapterName;
        subjectName = this.getNameById(targetChapter.subjectId, allSubject);
        className = this.getNameById(targetChapter.classId, allClass);
      }

      const createdAt = moment(mcq.get('createdAt')).format('YYYY-MM-DD');
      return {
        mcq: (
          <Link to={`/mcq/${mcq.get('id')}`} style={{ color: 'blue' }}>
            {contentToShow}
          </Link>
        ),
        mcqType,
        chapterName,
        subjectName,
        className,
        createdAt,
      };
    });

    return { columns, rows: rows.toJS() };
  };

  splitStringForContent = str => {
    let words = str.split(' ');

    let newStr = '';
    if (words.size <= 5) {
      newStr = str;
    } else {
      let count = 0;
      for (const c of words) {
        if (count === 5) {
          break;
        }
        newStr = `${newStr} ${c}`;
        count++;
      }
      newStr = `${newStr}...`;
    }
    return newStr;
  };

  getNameById = (id, data) => {
    const filteredItem = data.filter(item => item.get('id') === id);
    return filteredItem && filteredItem.size > 0
      ? filteredItem.get(0).toJS().name
      : '';
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
            <MDBDataTable
              striped
              bordered
              small
              data={this.createDataForTable(
                allMcqs,
                allChapter,
                allClass,
                allSubject
              )}
            />
          </div>
        </div>
      </span>
    );
  }
}

export default QuestionList;
