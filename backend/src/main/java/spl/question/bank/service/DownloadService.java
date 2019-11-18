package spl.question.bank.service;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.client.QuestionPaperMapper;
import spl.question.bank.database.client.QuestionPaperQuestionMapper;
import spl.question.bank.database.model.*;
import spl.question.bank.model.admin.Roles;
import spl.question.bank.model.moderator.ExamType;
import spl.question.bank.model.question.DownloadCriteria;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.QuestionType;
import spl.question.bank.service.download.PdfTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Service
@Slf4j
public class DownloadService {
  private final MCQQuestionMapper mcqQuestionMapper;
  private final UserService userService;
  private final QuestionPaperMapper questionPaperMapper;
  private final QuestionPaperQuestionMapper paperQuestionMapper;
  private final McqService mcqService;
  private final PdfTemplate pdfTemplate;


  public DownloadService(MCQQuestionMapper mcqQuestionMapper,
                         UserService userService,
                         QuestionPaperMapper questionPaperMapper,
                         QuestionPaperQuestionMapper paperQuestionMapper,
                         McqService mcqService, PdfTemplate pdfTemplate) {
    this.mcqQuestionMapper = mcqQuestionMapper;
    this.userService = userService;
    this.questionPaperMapper = questionPaperMapper;
    this.paperQuestionMapper = paperQuestionMapper;
    this.mcqService = mcqService;
    this.pdfTemplate = pdfTemplate;
  }

  public ResponseEntity generateCQPaper(DownloadCriteria downloadCriteria) {
    return ResponseEntity.ok("Done");
  }

  public ResponseEntity generateMcqPaper(DownloadCriteria downloadCriteria) throws IOException {
    val teacherId = downloadCriteria.getTeacherId();
    if (!userService
        .getRolesByUser(teacherId)
        .contains(Roles.HEADMASTER.name())) {
      return ResponseEntity.status(FORBIDDEN).body("You do not have permission to download question.");
    }
    val subjectId = downloadCriteria.getSubjectId();
    val chapters = downloadCriteria.getChapters();
    val mcqExample = new MCQQuestionExample();
    val examType = downloadCriteria.getExamType();
    if (Arrays
        .asList(
            ExamType.midExam.name(),
            ExamType.weeklyExam.name())
        .contains(examType)) {

      if (CollectionUtils.isEmpty(chapters)) {
        return ResponseEntity.badRequest().body("Must provide chapters in MID exam.");
      }
      if (ExamType.midExam.name().equals(examType)) {
        mcqExample.createCriteria()
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      } else {
        mcqExample.createCriteria()
            .andCreatedByEqualTo(teacherId)
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      }

    } else {
      mcqExample.createCriteria()
          .andSubjectIdEqualTo(downloadCriteria.getSubjectId())
          .andStatusEqualTo(QuestionStatus.approved.name());
    }

    val allApprovedMcq = mcqQuestionMapper.selectByExample(mcqExample);
    val idList = new ArrayList<WeightedId>();
    int totalWeightInDb = 0;

    for (val mcq : allApprovedMcq) {
      totalWeightInDb += mcq.getWeight();
      idList.add(new WeightedId()
          .setQuestionId(mcq.getId())
          .setWeight(mcq.getWeight()));
    }

    final int totalWeight = ExamType.valueOf(examType).getMcqWeight();
    if (totalWeightInDb < totalWeight) {
      return ResponseEntity.status(BAD_REQUEST).body("Question Bank does not have sufficient question.");
    }

    val generatedIds = prepareQuestionPaper(QuestionType.MCQ.name(), teacherId, subjectId, examType, totalWeight, idList);
    MCQQuestionExample ex = new MCQQuestionExample();
    ex.createCriteria().andIdIn(generatedIds);
    val dtos = mcqService.getDtoByExample(ex);
    return ResponseEntity.ok(dtos);
  }

  private List<Integer> prepareQuestionPaper(
      String qType,
      Integer teacherId, Integer subjectId,
      String examType, int totalWeight,
      ArrayList<WeightedId> idList) {

    if (examType.equals(ExamType.weeklyExam.name())) {
      return generateNewPaper(totalWeight, idList);
    }

    val qpEx = new QuestionPaperExample();
    qpEx.createCriteria()
        .andTypeEqualTo(qType)
        .andGeneratedByEqualTo(teacherId)
        .andSubjectIdEqualTo(subjectId);
    qpEx.setOrderByClause("created_at DESC");

    val allPaperOfThisExm = questionPaperMapper.selectByExample(qpEx);

    if (allPaperOfThisExm.isEmpty()) {
      val newPaperQuestionIds = generateNewPaper(totalWeight, idList);
      val paperId = saveNewPaper(qType, examType, teacherId, subjectId);
      addQuestionIdToPaperId(paperId, newPaperQuestionIds);
      return newPaperQuestionIds;
    } else {
      // Similarity tolerance of two consecutive same exam
      double toleranceOfSimilarity = qType.equals(QuestionType.MCQ.name()) ? 10 : 20;
      val lastPaperOfThisExam = allPaperOfThisExm.get(0);
      val lastPaperQuestions = getQuestionIdsByPaperId(lastPaperOfThisExam.getId());
      val storedResult = new TreeMap<Double, List<Integer>>();
      boolean flag = false;
      List<Integer> newPaperQuestions = new ArrayList<>();
      for (int i = 0; i < 4; i++) {
        newPaperQuestions = generateNewPaper(totalWeight, idList);
        double similarity = computeSimilarityPercentage(lastPaperQuestions, newPaperQuestions);
        if (similarity <= toleranceOfSimilarity) {
          flag = true;
          break;
        }
        storedResult.put(similarity, newPaperQuestions);
      }

      if (!flag) {
        newPaperQuestions = storedResult.firstEntry().getValue();
      }
      val paperId = saveNewPaper(qType, examType, teacherId, subjectId);
      addQuestionIdToPaperId(paperId, newPaperQuestions);
      return newPaperQuestions;
    }
  }

  private double computeSimilarityPercentage(List<Integer> lastPaperQuestions,
                                             List<Integer> newPaperQuestions) {
    long questionCount = newPaperQuestions.size();
    long similarCount = newPaperQuestions.stream().filter(lastPaperQuestions::contains).count();
    double similarityPercentage = (double) (similarCount * 100) / questionCount;
    return Math.floor(similarityPercentage);
  }

  private List<Integer> getQuestionIdsByPaperId(Integer paperId) {
    val ex = new QuestionPaperQuestionExample();
    ex.createCriteria().andQuestionPaperIdEqualTo(paperId);

    return paperQuestionMapper
        .selectByExample(ex)
        .stream()
        .map(QuestionPaperQuestion::getQuestionId)
        .collect(toList());
  }

  private Integer saveNewPaper(String type, String examType, Integer teacherId, Integer subjectId) {
    val newPaper = new QuestionPaper();
    newPaper.setExamType(examType);
    newPaper.setCreatedAt(new Date(System.currentTimeMillis()));
    newPaper.setGeneratedBy(teacherId);
    newPaper.setType(type);
    newPaper.setSubjectId(subjectId);

    questionPaperMapper.insert(newPaper);
    return newPaper.getId();
  }

  private void addQuestionIdToPaperId(Integer paperId, List<Integer> newPaperQuestionIds) {
    for (Integer questionId : newPaperQuestionIds) {
      val qpq = new QuestionPaperQuestion();
      qpq.setQuestionId(questionId);
      qpq.setQuestionPaperId(paperId);
      paperQuestionMapper.insert(qpq);
    }
  }

  private List<Integer> generateNewPaper(int totalWeight, ArrayList<WeightedId> idList) {

    val questionIds = new ArrayList<Integer>();
    int totalQuestion = idList.size(), summedWeight = 0, prevWeight;
    Random random = new Random(totalQuestion);

    while (summedWeight != totalWeight) {
      int randIndex = random.nextInt(totalQuestion);
      val item = idList.get(randIndex);
      Integer qId = item.getQuestionId();
      if (!questionIds.contains(qId)) {
        prevWeight = item.getWeight();
        summedWeight += item.getWeight();
        if (summedWeight > totalWeight) {
          summedWeight -= prevWeight;
          continue;
        }
        questionIds.add(qId);
      }
    }
    return questionIds;
  }

  public void downloadMcqPaper(HttpServletResponse response, Integer paperId) throws IOException {

    val idsOfPaper = getQuestionIdsByPaperId(paperId);
    MCQQuestionExample ex = new MCQQuestionExample();
    ex.createCriteria().andIdIn(idsOfPaper);
    val dtos = mcqService.getDtoByExample(ex);
    pdfTemplate.createMcqPdf(response, dtos);
  }

  @Data
  @Accessors(chain = true)
  static class WeightedId {
    Integer questionId;
    int weight;
  }
}
