package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.model.CQQuestionExample;
import spl.question.bank.database.model.MCQQuestionExample;
import spl.question.bank.database.model.UserExample;
import spl.question.bank.model.admin.Roles;
import spl.question.bank.model.question.QuestionType;

import java.util.*;

import static spl.question.bank.model.question.QuestionType.CQ;
import static spl.question.bank.model.question.QuestionType.MCQ;

@Service
@Slf4j
public class StatService {

  private final UserService userService;
  private final UserMapper userMapper;
  private final MCQQuestionMapper mcqQuestionMapper;
  private final CQQuestionMapper cqQuestionMapper;

  public StatService(
      UserService userService,
      UserMapper userMapper,
      MCQQuestionMapper mcqQuestionMapper,
      CQQuestionMapper cqQuestionMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
    this.mcqQuestionMapper = mcqQuestionMapper;
    this.cqQuestionMapper = cqQuestionMapper;
  }

  public ResponseEntity<?> getStatData(Integer id) {
    val user = userService.getAuthenticatedUser();
    if (!id.equals(user.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body("You do not have access to this dashboard.");
    }
    val mcqCountMap = countMcq(id);
    val cqCountMap = countCq(id);
    long createdMcqCount = getTotalCreatedCount(id, MCQ);
    long createdCqCount = getTotalCreatedCount(id, CQ);

    val resultMap = new HashMap<String, Object>();

    resultMap.put("createdCqMap", cqCountMap);
    resultMap.put("createdMcqMap", mcqCountMap);
    resultMap.put("createdMcqCount", createdMcqCount);
    resultMap.put("createdCqCount", createdCqCount);

    if (userService.getRolesByUser(id).contains(Roles.HEADMASTER.name())) {
      long totalTeacher = getTotalTeacher(user.getEiinNumber());
      resultMap.put("totalTeacher", totalTeacher);
    }

    if (userService.getRolesByUser(id).contains(Roles.MODERATOR.name())) {
      long moderatedMcqCount = getTotalModeratedCount(id, MCQ);
      long moderatedCqCount = getTotalModeratedCount(id, CQ);

      resultMap.put("moderatedMcqCount", moderatedMcqCount);
      resultMap.put("moderatedCqCount", moderatedCqCount);
    }
    return ResponseEntity.ok(resultMap);
  }

  private long getTotalTeacher(Integer eiin) {
    val ex = new UserExample();
    ex.createCriteria().andEiinNumberEqualTo(eiin);
    return userMapper.countByExample(ex);
  }

  private long getTotalCreatedCount(Integer userId, QuestionType questionType) {
    if (questionType.equals(QuestionType.CQ)) {
      CQQuestionExample cqEx = new CQQuestionExample();
      cqEx.createCriteria().andCreatedByEqualTo(userId);
      return cqQuestionMapper.countByExample(cqEx);
    } else {
      MCQQuestionExample mcqEx = new MCQQuestionExample();
      mcqEx.createCriteria().andCreatedByEqualTo(userId);
      return mcqQuestionMapper.countByExample(mcqEx);
    }
  }

  private long getTotalModeratedCount(Integer userId, QuestionType questionType) {
    if (questionType.equals(QuestionType.CQ)) {
      CQQuestionExample cqEx = new CQQuestionExample();
      cqEx.createCriteria().andModeratedByEqualTo(userId);
      return cqQuestionMapper.countByExample(cqEx);
    } else {
      MCQQuestionExample mcqEx = new MCQQuestionExample();
      mcqEx.createCriteria().andModeratedByEqualTo(userId);
      return mcqQuestionMapper.countByExample(mcqEx);
    }
  }

  private Map<String, Integer> countCq(Integer id) {
    CQQuestionExample cqEx = new CQQuestionExample();
    val sixMonthAgo = DateUtils.getFirstDateBefore(5);
    cqEx.createCriteria().andCreatedByEqualTo(id).andCreatedAtBetween(sixMonthAgo, new Date());
    cqEx.setOrderByClause("created_at DESC");

    val data = cqQuestionMapper.selectByExample(cqEx);
    Map<String, Integer> mcqCountMap = initMap();
    data.forEach(
        mcqQuestion -> {
          String key = DateUtils.getYearMonth(mcqQuestion.getCreatedAt());
          mcqCountMap.merge(key, 1, Integer::sum);
        });
    return mcqCountMap;
  }

  private Map<String, Integer> countMcq(Integer id) {
    MCQQuestionExample mcqEx = new MCQQuestionExample();
    val sixMonthAgo = DateUtils.getFirstDateBefore(5);
    mcqEx.createCriteria().andCreatedByEqualTo(id).andCreatedAtBetween(sixMonthAgo, new Date());
    mcqEx.setOrderByClause("created_at DESC");
    val data = mcqQuestionMapper.selectByExample(mcqEx);
    Map<String, Integer> cqCountMap = initMap();
    data.forEach(
        cqQuestion -> {
          String key = DateUtils.getYearMonth(cqQuestion.getCreatedAt());
          cqCountMap.merge(key, 1, Integer::sum);
        });
    return cqCountMap;
  }

  private Map<String, Integer> initMap() {
    Map<String, Integer> newMap = new LinkedHashMap<>();
    for (int i = 5; i >= 0; i--) {
      String key = DateUtils.getYearMonth(DateUtils.getDateMinusMonth(i));
      newMap.put(key, 0);
    }
    return newMap;
  }
}
