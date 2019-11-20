/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm, FieldArray, Field } from 'redux-form/immutable';

import { FormSelect, FormInput } from 'components/FormComponent';
class CqForm extends Component {
  static propTypes = {
    classes: PropTypes.object,
    subjects: PropTypes.object,
    chapters: PropTypes.object,
    selectedClass: PropTypes.object,
    selectedSubject: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  };

  prepareClasses = classes =>
    classes.map(cls => ({
      label: cls.get('name'),
      value: cls.get('id'),
    }));

  prepareSubjects = subjects => {
    const { selectedClass } = this.props;
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

  prepareChapters = chapters => {
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

  render() {
    const {
      classes,
      subjects,
      selectedClass,
      selectedSubject,
      chapters,
      handleSubmit,
      submitting,
      valid,
      pristine,
    } = this.props;
    return (
      <div className="jumbotron">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <FormSelect
                name="class"
                label="শ্রেণী"
                options={this.prepareClasses(classes)}
              />
            </div>
            <div className="col">
              <FormSelect
                name="subjectId"
                label="বিষয়"
                placeholder={
                  selectedClass ? 'Select subject' : 'Please select class first'
                }
                disabled={selectedClass ? false : true}
                options={this.prepareSubjects(subjects)}
              />
            </div>
            <div className="col">
              <FormSelect
                name="chapterId"
                label="অধ্যায়"
                placeholder={
                  selectedSubject
                    ? 'Select chapter'
                    : 'Please select subject first'
                }
                disabled={selectedSubject ? false : true}
                options={this.prepareChapters(chapters)}
              />
            </div>
          </div>

          <fieldset className="border p-2">
            <legend className="w-auto">Creative Question</legend>
            <FormInput name="stem" label="উদ্দীপক" type="textarea" />
            <FormInput name="knowledgeBased" label="(ক)" />
            <FormInput name="understandingBased" label="(খ)" />
            <FormInput name="applicationBased" label="(গ)" />
            <FormInput name="higherAbility" label="(ঘ)" />
          </fieldset>

          <FormInput name="weight" label="নম্বর" type="number" />
          <div className="mt-2">
            <label>স্তর</label>
            <div>
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="easy"
                />
                সহজ স্তর
              </label>
              {'    '}
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="standard"
                />
                মধ্যম স্তর
              </label>
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="hard"
                />
                কঠিন স্তর
              </label>
              {'    '}
            </div>
          </div>
          <div>
            <button
              disabled={!valid || pristine || submitting}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  form: 'cqForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(CqForm);
