package spl.question.bank.web.teacher;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.model.MCQQuestion;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.QuestionService;

import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@RestController
@RequestMapping("/api/teacher")
public class McqController {
  private final QuestionService questionService;

  public McqController(final QuestionService questionService) {
    this.questionService = questionService;
  }

  @RequestMapping(value = "/question/mcq", method = POST, consumes = APPLICATION_JSON_UTF8_VALUE)
  public MCQQuestion createMcq(final @RequestBody MCQDto mcqDto) throws JsonProcessingException {
    logger.info("Mcq => {}", mcqDto);
    return questionService.saveMcq(mcqDto);
  }

  @RequestMapping(value = "/question/mcq/{mcqId}", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
  public MCQDto getMcq(final @PathVariable("mcqId") Integer mcqId) throws IOException {
    return questionService.getMcqById(mcqId);
  }
}
