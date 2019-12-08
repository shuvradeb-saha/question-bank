package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.service.StatService;

@RequestMapping("/api/teacher")
@RestController
@Slf4j
public class StatController {
  private final StatService statService;

  public StatController(StatService statService) {
    this.statService = statService;
  }

  @GetMapping(value = "/data/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<?> getData(@PathVariable Integer id) {
    return statService.getStatData(id);
  }
}
