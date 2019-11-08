package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.service.QuestionService;

@RestController
@Slf4j
@RequestMapping("/api/moderator")
public class ModeratorController {

  private final QuestionService questionService;

  public ModeratorController(QuestionService questionService) {
    this.questionService = questionService;
  }

  @RequestMapping(
      value = "/mcq/{status}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
      method = RequestMethod.GET)
  public ResponseEntity getMcqQuestions(@PathVariable("status") QuestionStatus status) {
    return questionService.retrieveMcqForModerator(status);
  }
}
