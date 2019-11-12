package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.model.CQQuestion;

@Service
@Slf4j
public class CqService {
  private final CQQuestionMapper cqQuestionMapper;

  public CqService(CQQuestionMapper cqQuestionMapper) {
    this.cqQuestionMapper = cqQuestionMapper;
  }

  public ResponseEntity saveCq(CQQuestion cqQuestion) {
    cqQuestionMapper.insert(cqQuestion);
    return ResponseEntity.ok("CQ question added successfully");
  }
}
