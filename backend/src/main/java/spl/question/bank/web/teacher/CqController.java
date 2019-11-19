package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.CqService;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@Slf4j
@RequestMapping(value = "/api/teacher")
public class CqController {

  private final CqService cqService;

  public CqController(CqService cqService) {
    this.cqService = cqService;
  }

  @RequestMapping(
      value = "/question/cq",
      method = RequestMethod.POST,
      consumes = APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity saveCq(@RequestBody CQQuestion cqQuestion) {
    logger.info("Cq Question => {}", cqQuestion);
    return cqService.saveCq(cqQuestion);
  }

  @RequestMapping(
      value = "/question/cq/{cqId}",
      method = GET,
      produces = APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity getCQ(final @PathVariable("cqId") Integer cqId) throws IOException {
    return cqService.getCQById(cqId);
  }

  @RequestMapping(
      value = "/question/cq/{status}/{teacherId}",
      method = GET,
      produces = APPLICATION_JSON_UTF8_VALUE)
  public List<CQQuestion> getCqQuestions(
      final @PathVariable QuestionStatus status, final @PathVariable Integer teacherId) {
    return cqService.getCQListByStatus(status, teacherId);
  }
}
