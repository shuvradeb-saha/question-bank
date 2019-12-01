export const strcmp = (a, b) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();

  return lowerA > lowerB ? 1 : lowerA === lowerB ? 0 : -1;
};

export const splitStringForContent = str => {
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

export const getNameById = (id, data) => {
  const filteredItem = data.filter(item => item.get('id') === id);
  return filteredItem && filteredItem.size > 0
    ? filteredItem.get(0).toJS().name
    : '';
};

export const extractNameObject = (
  chapterId,
  allChapter,
  allClass,
  allSubject
) => {
  let chapterName = '',
    subjectName = '',
    className = '';

  const filterdChapter = allChapter.filter(chp => chp.get('id') === chapterId);

  if (filterdChapter && filterdChapter.get(0)) {
    const targetChapter = filterdChapter.get(0).toJS();

    chapterName = targetChapter.chapterName;
    subjectName = getNameById(targetChapter.subjectId, allSubject);
    className = getNameById(targetChapter.classId, allClass);
  }

  return { className, subjectName, chapterName };
};

export const prepareClasses = classes =>
  classes.map(cls => ({
    label: cls.get('name'),
    value: cls.get('id'),
  }));

export const prepareSubjects = (selectedClass, subjects) => {
  return subjects
    .filter(
      subject =>
        selectedClass && subject.get('classId') === selectedClass.get('value')
    )
    .map(subject => ({
      label: subject.get('name'),
      value: subject.get('id'),
    }));
};

export const prepareChapters = chapters => {
  const { selectedSubject } = this.props;
  return chapters
    .filter(
      chapter =>
        selectedSubject &&
        chapter.get('subjectId') === selectedSubject.get('value')
    )
    .map(chapter => ({
      label: chapter.get('chapterName'),
      value: chapter.get('id'),
    }));
};

export const getClassNameBySubjectId = (id, allClass, allSubject) => {
  let clsId;
  allSubject.forEach(subject => {
    if (subject.get('id') === id) {
      clsId = subject.get('classId');
    }
  });
  if (clsId === undefined) {
    return '';
  } else {
    return getNameById(clsId, allClass);
  }
};
