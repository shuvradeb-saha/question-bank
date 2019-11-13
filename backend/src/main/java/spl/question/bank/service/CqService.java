package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.model.question.QuestionStatus;

import java.util.Date;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static spl.question.bank.model.question.QuestionStatus.pending;

@Service
@Slf4j
public class CqService {
  private final CQQuestionMapper cqQuestionMapper;

  public CqService(CQQuestionMapper cqQuestionMapper) {
    this.cqQuestionMapper = cqQuestionMapper;
  }

  public ResponseEntity saveCq(CQQuestion cqQuestion) {
    if (cqQuestion.getWeight() < 0) {
      throw new IllegalArgumentException("Question weight must be positive.");
    }

    validateCq(cqQuestion);
    cqQuestion.setStatus(pending.name());
    cqQuestion.setCreatedAt(new Date(System.currentTimeMillis()));
    cqQuestionMapper.insert(cqQuestion);
    return ResponseEntity.ok("CQ question added successfully.");
  }

  private void validateCq(CQQuestion cq) {
    if (isBlank(cq.getStem()) || isBlank(cq.getKnowledgeBased())
        || isBlank(cq.getApplicationBased()) || isBlank(cq.getUnderstandingBased())
        || isBlank(cq.getHigherAbility())) {
      throw new IllegalArgumentException("Write all cq part correctly.");
    }
  }

  /*public ResponseEntity getCqById(Integer cqId) {

  }

  public ResponseEntity getAllCQ() {

  }*/
}
