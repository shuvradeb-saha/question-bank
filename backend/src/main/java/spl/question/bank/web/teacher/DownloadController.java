package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.model.question.DownloadCriteria;
import spl.question.bank.model.question.QuestionType;
import spl.question.bank.service.DownloadService;

@RestController
@Slf4j
@RequestMapping(value = "/api/headmaster")
public class DownloadController {

  private final DownloadService downloadService;

  public DownloadController(DownloadService downloadService) {
    this.downloadService = downloadService;
  }

  @RequestMapping(value = "/generate/paper", method = RequestMethod.POST)
  public ResponseEntity generatePaper(@RequestBody DownloadCriteria downloadCriteria) {
    if(downloadCriteria.getQuestionType().equals(QuestionType.MCQ.name())) {
      return downloadService.generateMcqPaper(downloadCriteria);
    } else {
      return downloadService.generateCQPaper(downloadCriteria);
    }
  }

}
