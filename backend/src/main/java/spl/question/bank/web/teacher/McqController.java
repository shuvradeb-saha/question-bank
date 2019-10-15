package spl.question.bank.web.teacher;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.QuestionService;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
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
  public MCQDto createQuestion(final @RequestBody MCQDto mcqDto) throws JsonProcessingException {
    logger.info("Mcq => {}", mcqDto);
    questionService.saveMcq(mcqDto);
    return mcqDto;
  }

  public void updateQuestion() {

  }

  public void removeQuestion() {

  }
}
