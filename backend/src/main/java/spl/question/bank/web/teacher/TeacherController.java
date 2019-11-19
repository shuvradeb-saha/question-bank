package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.service.TeacherService;
import spl.question.bank.service.UserService;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@Slf4j
@RequestMapping("/api/teacher")
public class TeacherController {
  private final TeacherService teacherService;

  public TeacherController(final TeacherService teacherService) {
    this.teacherService = teacherService;
  }

  @RequestMapping(value = "/allocation/{teacherId}", method = GET)
  public List<Integer> getAllocatedSubject(final @PathVariable("teacherId") Integer teacherId) {
    return teacherService.getAllocatedSubject(teacherId);
  }
}
