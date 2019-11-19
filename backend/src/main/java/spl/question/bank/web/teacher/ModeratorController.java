package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.QuestionType;
import spl.question.bank.service.CqService;
import spl.question.bank.service.ModeratorService;
import spl.question.bank.service.McqService;

import java.io.IOException;

@RestController
@Slf4j
@RequestMapping("/api/moderator")
public class ModeratorController {

  private final McqService mcqService;
  private final CqService cqService;
  private final ModeratorService moderatorService;

  public ModeratorController(
      McqService mcqService, CqService cqService, ModeratorService moderatorService) {
    this.mcqService = mcqService;
    this.cqService = cqService;
    this.moderatorService = moderatorService;
  }

  @RequestMapping(
      value = "/all/mcq/{status}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
      method = RequestMethod.GET)
  public ResponseEntity getMcqQuestions(@PathVariable("status") QuestionStatus status) {
    return mcqService.retrieveMcqForModerator(status);
  }

  @RequestMapping(
      value = "/mcq/{mcqId}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
      method = RequestMethod.GET)
  public ResponseEntity getSimilarQuestion(@PathVariable Integer mcqId) throws IOException {
    return moderatorService.getSimilarMcqs(mcqId);
  }

  @RequestMapping(
      value = "/question/{questionType}/{questionId}/{status}",
      method = RequestMethod.PUT)
  public ResponseEntity changeQuestionStatus(
      @PathVariable("questionType") QuestionType questionType,
      @PathVariable("questionId") Integer questionId,
      @PathVariable("status") QuestionStatus status) {
    return moderatorService.changeQuestionStatus(questionId, questionType, status);
  }
  // Todo => need to complete all for cq
  @RequestMapping(
      value = "/all/cq/{status}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
      method = RequestMethod.GET)
  public ResponseEntity getCqQuestions(@PathVariable("status") QuestionStatus status) {
    return cqService.retrieveCQForModerator(status);
  }

  @RequestMapping(
      value = "/cq/{cqId}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
      method = RequestMethod.GET)
  public ResponseEntity getSimilarCQ(@PathVariable Integer cqId) throws IOException {
    return moderatorService.getSimilarCQS(cqId);
  }
}
