package spl.question.bank.web;

import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.client.ClassMapper;
import spl.question.bank.database.model.Class;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class ClassController {

  private final ClassMapper classMapper;

  public ClassController(
      final ClassMapper classMapper) {
    this.classMapper = classMapper;

  }

  @RequestMapping(value = "/class",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void createClass(final @RequestBody Class classInfo) {
    saveClass(classInfo);
  }

  @RequestMapping(value = "/class",
      method = RequestMethod.PUT,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void updateClass(final @RequestBody Class classInfo) {
    saveClass(classInfo);
  }

  @RequestMapping(value = "/class/{id}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public Class getClass(final @PathVariable Integer classId) {
    return classMapper.selectByPrimaryKey(classId);
  }

  @RequestMapping(value = "/class}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<Class> getAllClass() {
    return classMapper.selectByExample(null);
  }

  private void saveClass(Class classInfo) {
    if (isBlank(classInfo.getName())) {
      throw new IllegalArgumentException("must enter class name");
    }
    if (classInfo.getId() == null) {
      classMapper.insert(classInfo);
    } else {
      classMapper.updateByPrimaryKey(classInfo);
    }
  }
}
