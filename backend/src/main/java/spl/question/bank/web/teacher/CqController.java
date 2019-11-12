package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.service.CqService;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@Slf4j
@RequestMapping(value = "/api/teacher")
public class CqController {

  private final CqService cqService;

  public CqController(CqService cqService) {
    this.cqService = cqService;
  }

  @RequestMapping(value = "/cq", method = RequestMethod.POST, consumes = APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity saveCq(@RequestBody CQQuestion cqQuestion) {
    return cqService.saveCq(cqQuestion);
  }
}
