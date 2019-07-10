package spl.question.bank.web.admin;


import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.client.SubjectMapper;
import spl.question.bank.database.model.Subject;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class SubjectController {

  private final SubjectMapper subjectMapper;

  public SubjectController(final SubjectMapper subjectMapper) {
    this.subjectMapper = subjectMapper;
  }

  @RequestMapping(value = "/subject",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void createSubject(final @RequestBody Subject subject) {
    saveSubject(subject);
  }

  @RequestMapping(value = "/subject",
      method = RequestMethod.PUT,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void updateSubject(final @RequestBody Subject subject) {
    saveSubject(subject);
  }

  @RequestMapping(value = "/subject/{id}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public Subject getSubject(final @PathVariable Integer subjectId) {
    return subjectMapper.selectByPrimaryKey(subjectId);
  }

  @RequestMapping(value = "/subject}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<Subject> getAllSubject() {
    return subjectMapper.selectByExample(null);
  }

  private void saveSubject(Subject subject) {
    if (isBlank(subject.getName()) || subject.getSubjectCode() == null
        || subject.getClassId() == null) {
      throw new IllegalArgumentException("Enter all information correctly");
    }
    if (subject.getId() == null) {
      subjectMapper.insert(subject);
    } else {
      subjectMapper.updateByPrimaryKey(subject);
    }
  }
}
