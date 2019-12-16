package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.database.model.CQQuestionExample;
import spl.question.bank.model.admin.Roles;
import spl.question.bank.model.question.QuestionStatus;

import java.util.Date;
import java.util.List;

import static java.util.Objects.isNull;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static spl.question.bank.model.question.QuestionStatus.pending;

@Service
@Slf4j
public class CqService {
  private final CQQuestionMapper cqQuestionMapper;
  private final UserService userService;
  private final MailService mailService;

  public CqService(
      CQQuestionMapper cqQuestionMapper, UserService userService, MailService mailService) {
    this.cqQuestionMapper = cqQuestionMapper;
    this.userService = userService;
    this.mailService = mailService;
  }

  public ResponseEntity<?> saveCq(CQQuestion cqQuestion) {
    Integer creatorId = cqQuestion.getCreatedBy();
    Integer subjectId = cqQuestion.getSubjectId();

    if (cqQuestion.getWeight() != 10) {
      throw new IllegalArgumentException("Each Cq weight must be 10.");
    }

    if (!userService.checkTeacherSubject(creatorId, subjectId)) {
      throw new IllegalArgumentException("You are not assigned in the subject.");
    }
    if (cqQuestion.getWeight() < 0) {
      throw new IllegalArgumentException("Question weight must be positive.");
    }

    validateCq(cqQuestion);
    cqQuestion.setStatus(pending.name());
    cqQuestion.setCreatedAt(new Date(System.currentTimeMillis()));
    val moderator =
        userService.getRandomModerator(cqQuestion.getSubjectId(), cqQuestion.getCreatedBy());
    cqQuestion.setModeratedBy(moderator.getId());
    cqQuestionMapper.insert(cqQuestion);
    mailService.sendEmailToModerator(
        moderator.getEmail(), moderator.getFirstName() + " " + moderator.getLastName());

    return ResponseEntity.ok("CQ question added successfully.");
  }

  private void validateCq(CQQuestion cq) {
    if (isBlank(cq.getStem())
        || isBlank(cq.getKnowledgeBased())
        || isBlank(cq.getApplicationBased())
        || isBlank(cq.getUnderstandingBased())
        || isBlank(cq.getHigherAbility())) {
      throw new IllegalArgumentException("Write all cq part correctly.");
    }
  }

  public ResponseEntity getCQById(Integer cqId) {
    val cqQuestion = cqQuestionMapper.selectByPrimaryKey(cqId);
    if (isNull(cqQuestion)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No CQ found with id => " + cqId);
    }
    val authenticatedUserId = userService.getAuthenticatedUser().getId();
    // Question creator & moderators can view the question
    if (!authenticatedUserId.equals(cqQuestion.getCreatedBy())) {
      if (!userService.getRolesByUser(authenticatedUserId).contains(Roles.MODERATOR.name())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body("You don't have access to see this question.");
      }
    }
    return ResponseEntity.ok().body(cqQuestion);
  }

  public List<CQQuestion> getCQListByStatus(QuestionStatus status, Integer teacherId) {
    val ex = new CQQuestionExample();
    ex.createCriteria().andStatusEqualTo(status.name()).andCreatedByEqualTo(teacherId);
    return cqQuestionMapper.selectByExample(ex);
  }

  public ResponseEntity retrieveCQForModerator(QuestionStatus status) {
    Integer moderatorId = userService.getAuthenticatedUser().getId();
    val cqEx = new CQQuestionExample();
    cqEx.createCriteria().andStatusEqualTo(status.name()).andModeratedByEqualTo(moderatorId);
    val allCq = cqQuestionMapper.selectByExample(cqEx);
    logger.info("CQ size ==> {}", allCq.size());
    return ResponseEntity.ok(allCq);
  }

  public List<CQQuestion> getCQListByStatusAndSubject(Integer subjectId, QuestionStatus approved) {
    val cqex = new CQQuestionExample();
    cqex.createCriteria().andSubjectIdEqualTo(subjectId).andStatusEqualTo(approved.name());
    return cqQuestionMapper.selectByExample(cqex);
  }

  public ResponseEntity<?> deleteById(Integer cqId) {
    cqQuestionMapper.deleteByPrimaryKey(cqId);
    return ResponseEntity.ok("Mcq Successfully Deleted.");
  }
}
