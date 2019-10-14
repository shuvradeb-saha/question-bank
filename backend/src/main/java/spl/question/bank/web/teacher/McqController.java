package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.model.question.mcq.MCQDto;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@RestController
@RequestMapping("/api/teacher")
public class McqController {

  @RequestMapping(value = "/question/mcq", method = POST, consumes = APPLICATION_JSON_UTF8_VALUE)
  public MCQDto createQuestion(final @RequestBody MCQDto mcqDto) {
    logger.info("Mcq => {}", mcqDto);

    return mcqDto;
  }

  public void updateQuestion() {

  }

  public void removeQuestion() {

  }
}
