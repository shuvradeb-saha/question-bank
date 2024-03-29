package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import spl.question.bank.model.teacher.PasswordDto;
import spl.question.bank.service.TeacherService;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

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

  @RequestMapping(
      value = "/upload/profile/picture",
      method = POST,
      consumes = MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> uploadNewProfilePicture(
      @RequestParam Integer userId, @RequestParam MultipartFile profilePic) throws IOException {
    return teacherService.saveProPic(userId, profilePic);
  }

  @RequestMapping(
      value = "/change/password",
      method = POST,
      consumes = APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<String> changePassword(@RequestBody PasswordDto passwordDto) {
    return teacherService.changePassoword(passwordDto);
  }
}
