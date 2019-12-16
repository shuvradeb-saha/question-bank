package spl.question.bank.service;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.client.QuestionPaperMapper;
import spl.question.bank.database.client.QuestionPaperQuestionMapper;
import spl.question.bank.database.model.*;
import spl.question.bank.model.admin.Roles;
import spl.question.bank.model.moderator.ExamType;
import spl.question.bank.model.question.DownloadCriteria;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.QuestionType;
import spl.question.bank.service.download.PdfService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SecureRandom;
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
  private final PdfService pdfService;
  private final CQQuestionMapper cqQuestionMapper;

  public DownloadService(
      MCQQuestionMapper mcqQuestionMapper,
      UserService userService,
      QuestionPaperMapper questionPaperMapper,
      QuestionPaperQuestionMapper paperQuestionMapper,
      McqService mcqService,
      PdfService pdfService,
      CQQuestionMapper cqQuestionMapper) {
    this.mcqQuestionMapper = mcqQuestionMapper;
    this.userService = userService;
    this.questionPaperMapper = questionPaperMapper;
    this.paperQuestionMapper = paperQuestionMapper;
    this.mcqService = mcqService;
    this.pdfService = pdfService;
    this.cqQuestionMapper = cqQuestionMapper;
  }

  public ResponseEntity<?> generateCQPaper(DownloadCriteria downloadCriteria) {
    val teacherId = downloadCriteria.getTeacherId();
    if (!userService.getRolesByUser(teacherId).contains(Roles.HEADMASTER.name())) {
      return ResponseEntity.status(FORBIDDEN)
          .body("You do not have permission to download questions.");
    }
    val subjectId = downloadCriteria.getSubjectId();
    val chapters = downloadCriteria.getChapters();
    val cqExample = new CQQuestionExample();
    val examType = downloadCriteria.getExamType();
    if (Arrays.asList(ExamType.midExam.name()).contains(examType)) {

      if (CollectionUtils.isEmpty(chapters)) {
        throw new IllegalArgumentException("Must provide chapters in MID exam.");
      }
      if (ExamType.midExam.name().equals(examType)) {
        cqExample
            .createCriteria()
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      } else {
        cqExample
            .createCriteria()
            .andCreatedByEqualTo(teacherId)
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      }
    } else {
      cqExample
          .createCriteria()
          .andSubjectIdEqualTo(downloadCriteria.getSubjectId())
          .andStatusEqualTo(QuestionStatus.approved.name());
    }

    val allApprovedCq = cqQuestionMapper.selectByExample(cqExample);
    val idList = new ArrayList<WeightedId>();
    long totalWeightInDb = allApprovedCq.size() * 10;
    for (val cq : allApprovedCq) {
      idList.add(new WeightedId().setQuestionId(cq.getId()).setWeight(cq.getWeight()));
    }
    final int totalWeight =
        downloadCriteria.getTotalMarks(); // ExamType.valueOf(examType).getCqWeight();
    if (totalWeight <= 0 || totalWeight % 10 != 0) {
      return ResponseEntity.status(BAD_REQUEST)
          .body("Provide a valid weight. Total marks must be multiple of 10.");
    }
    if (totalWeightInDb < totalWeight) {
      return ResponseEntity.status(BAD_REQUEST)
          .body("Question Bank does not have sufficient questions.");
    }

    val generatedPaperId =
        prepareQuestionPaper(
            downloadCriteria,
            QuestionType.CQ.name(),
            teacherId,
            subjectId,
            examType,
            totalWeight,
            idList);
    val paperDetails = questionPaperMapper.selectByPrimaryKey(generatedPaperId);
    return ResponseEntity.ok(paperDetails);
  }

  public ResponseEntity<?> generateMcqPaper(DownloadCriteria downloadCriteria) {
    val teacherId = downloadCriteria.getTeacherId();
    if (!userService.getRolesByUser(teacherId).contains(Roles.HEADMASTER.name())) {
      return ResponseEntity.status(FORBIDDEN)
          .body("You do not have permission to download question.");
    }
    val subjectId = downloadCriteria.getSubjectId();
    val chapters = downloadCriteria.getChapters();
    val mcqExample = new MCQQuestionExample();
    val examType = downloadCriteria.getExamType();
    if (Arrays.asList(ExamType.midExam.name()).contains(examType)) {

      if (CollectionUtils.isEmpty(chapters)) {
        throw new IllegalArgumentException("Must provide chapters in MID exam.");
      }
      if (ExamType.midExam.name().equals(examType)) {
        mcqExample
            .createCriteria()
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      } else {
        mcqExample
            .createCriteria()
            .andCreatedByEqualTo(teacherId)
            .andSubjectIdEqualTo(subjectId)
            .andChapterIdIn(chapters)
            .andStatusEqualTo(QuestionStatus.approved.name());
      }
    } else {
      mcqExample
          .createCriteria()
          .andSubjectIdEqualTo(downloadCriteria.getSubjectId())
          .andStatusEqualTo(QuestionStatus.approved.name());
    }

    val allApprovedMcq = mcqQuestionMapper.selectByExample(mcqExample);
    val idList = new ArrayList<WeightedId>();
    int totalWeightInDb = 0;

    for (val mcq : allApprovedMcq) {
      totalWeightInDb += mcq.getWeight();
      idList.add(new WeightedId().setQuestionId(mcq.getId()).setWeight(mcq.getWeight()));
    }

    final int totalWeight =
        downloadCriteria.getTotalMarks(); // ExamType.valueOf(examType).getMcqWeight();
    if (totalWeightInDb < totalWeight) {
      return ResponseEntity.status(BAD_REQUEST)
          .body("Question Bank does not have sufficient questions.");
    }

    val generatedPaperId =
        prepareQuestionPaper(
            downloadCriteria,
            QuestionType.MCQ.name(),
            teacherId,
            subjectId,
            examType,
            totalWeight,
            idList);
    val paperDetails = questionPaperMapper.selectByPrimaryKey(generatedPaperId);
    return ResponseEntity.ok(paperDetails);
  }

  private Integer prepareQuestionPaper(
      DownloadCriteria downloadCriteria,
      String qType,
      Integer teacherId,
      Integer subjectId,
      String examType,
      int totalWeight,
      ArrayList<WeightedId> idList) {

    /**
     * if (examType.equals(ExamType.weeklyExam.name())) { return generateNewPaper(totalWeight,
     * idList); }
     */
    val qpEx = new QuestionPaperExample();
    qpEx.createCriteria()
        .andTypeEqualTo(qType)
        .andGeneratedByEqualTo(teacherId)
        .andSubjectIdEqualTo(subjectId);
    qpEx.setOrderByClause("created_at DESC");

    val allPaperOfThisExm = questionPaperMapper.selectByExample(qpEx);

    if (allPaperOfThisExm.isEmpty()) {
      val newPaperQuestionIds = generateNewPaper(totalWeight, idList);
      val paperId = saveNewPaper(downloadCriteria, qType, examType, teacherId, subjectId);
      addQuestionIdToPaperId(paperId, newPaperQuestionIds);
      return paperId;
    } else {
      // Similarity % tolerance of two consecutive
      double toleranceOfSimilarity = qType.equals(QuestionType.MCQ.name()) ? 10 : 20;
      val lastPaperOfThisExam = allPaperOfThisExm.get(0);
      val lastPaperQuestions = getQuestionIdsByPaperId(lastPaperOfThisExam.getId());
      logger.info("Last Exam Paper Ids => {}", lastPaperQuestions);
      val storedResult = new TreeMap<Double, List<Integer>>();
      boolean flag = false;
      List<Integer> newPaperQuestions = new ArrayList<>();
      logger.info(
          "Generating new Paper for Subject => {}, Exam => {}",
          downloadCriteria.getExamType(),
          examType);
      for (int i = 0; i < 5; i++) {
        newPaperQuestions = generateNewPaper(totalWeight, idList);
        logger.info("Iteration => {} & Generated => {}", (i + 1), newPaperQuestions);
        double similarity = computeSimilarityPercentage(lastPaperQuestions, newPaperQuestions);
        if (similarity <= toleranceOfSimilarity) {
          flag = true;
          break;
        }
        logger.info("Got similarity => {}. Retry question generation.", similarity);
        storedResult.put(similarity, newPaperQuestions);
      }

      if (!flag) {
        logger.info("Tree map => {}", storedResult);
        newPaperQuestions = storedResult.firstEntry().getValue();
      }
      val paperId = saveNewPaper(downloadCriteria, qType, examType, teacherId, subjectId);
      addQuestionIdToPaperId(paperId, newPaperQuestions);
      return paperId;
    }
  }

  private double computeSimilarityPercentage(
      List<Integer> lastPaperQuestions, List<Integer> newPaperQuestions) {
    long questionCount = newPaperQuestions.size();
    long similarCount = newPaperQuestions.stream().filter(lastPaperQuestions::contains).count();
    double similarityPercentage = (double) (similarCount * 100) / questionCount;
    return Math.floor(similarityPercentage);
  }

  private List<Integer> getQuestionIdsByPaperId(Integer paperId) {
    val ex = new QuestionPaperQuestionExample();
    ex.createCriteria().andQuestionPaperIdEqualTo(paperId);

    return paperQuestionMapper.selectByExample(ex).stream()
        .map(QuestionPaperQuestion::getQuestionId)
        .collect(toList());
  }

  private Integer saveNewPaper(
      DownloadCriteria criteria,
      String type,
      String examType,
      Integer teacherId,
      Integer subjectId) {
    val newPaper = new QuestionPaper();
    newPaper.setExamType(examType);
    newPaper.setCreatedAt(new Date(System.currentTimeMillis()));
    newPaper.setGeneratedBy(teacherId);
    newPaper.setType(type);
    newPaper.setSubjectId(subjectId);
    newPaper.setInstituteName(criteria.getInstituteName());
    newPaper.setDuration(criteria.getDuration());
    newPaper.setTotalMarks(criteria.getTotalMarks());

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
    // Random random = new Random(totalQuestion);
    SecureRandom random = new SecureRandom();

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
    val paperDetails = questionPaperMapper.selectByPrimaryKey(paperId);
    val idsOfPaper = getQuestionIdsByPaperId(paperId);

    logger.info("Paper details => {} Questions => {}", paperDetails, idsOfPaper);

    MCQQuestionExample ex = new MCQQuestionExample();
    ex.createCriteria().andIdIn(idsOfPaper);
    val dtos = mcqService.getDtoByExample(ex);
    pdfService.createMcqPdf(response, dtos, paperDetails);
  }

  public void downloadCqPaper(HttpServletResponse response, Integer paperId) throws IOException {
    val paperDetails = questionPaperMapper.selectByPrimaryKey(paperId);
    val idsOfPaper = getQuestionIdsByPaperId(paperId);

    logger.info("Paper details => {} Questions => {}", paperDetails, idsOfPaper);

    val cqEx = new CQQuestionExample();
    cqEx.createCriteria().andIdIn(idsOfPaper);
    val cqs = cqQuestionMapper.selectByExample(cqEx);
    pdfService.createCqPdf(response, cqs, paperDetails);
  }

  public ResponseEntity<?> getAllPaperById(Integer id) {
    val user = userService.getAuthenticatedUser();
    if (!user.getId().equals(id)) {
      return ResponseEntity.status(FORBIDDEN).body("You do not have access to this archive.");
    }
    val ex = new QuestionPaperExample();
    ex.createCriteria().andGeneratedByEqualTo(id);
    ex.setOrderByClause("created_at DESC");
    val items = questionPaperMapper.selectByExample(ex);

    return ResponseEntity.ok(items);
  }

  @Data
  @Accessors(chain = true)
  static class WeightedId {
    Integer questionId;
    int weight;
  }
}
