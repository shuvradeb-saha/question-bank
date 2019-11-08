package spl.question.bank.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.client.ModeratorQuestionMapper;
import spl.question.bank.database.model.MCQQuestion;
import spl.question.bank.database.model.MCQQuestionExample;
import spl.question.bank.model.question.Difficulty;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.SimpleQuestionDto;
import spl.question.bank.model.question.mcq.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNoneEmpty;
import static org.springframework.util.CollectionUtils.isEmpty;

@Service
@Slf4j
public class QuestionService {

  private final MCQQuestionMapper mcqMapper;
  private final ObjectMapper objectMapper;
  private final UserService userService;
  private final ModeratorQuestionMapper moderatorQuestionMapper;


  public QuestionService(final MCQQuestionMapper mcqMapper,
                         final UserService userService,
                         final ModeratorQuestionMapper moderatorQuestionMapper) {
    this.mcqMapper = mcqMapper;
    this.userService = userService;
    this.moderatorQuestionMapper = moderatorQuestionMapper;
    this.objectMapper = new ObjectMapper();
  }

  public MCQQuestion saveMcq(final MCQDto mcqDto) throws JsonProcessingException {
    val mcqQuestion = new MCQQuestion();

    if (mcqDto.getWeight() <= 0) {
      throw new IllegalArgumentException("Question weight must be positive.");
    }

    mcqQuestion.setCreatedAt(new Date(System.currentTimeMillis()));
    mcqQuestion.setCreatedBy(mcqDto.getCreatedBy());
    mcqQuestion.setSubjectId(mcqDto.getSubjectId());
    mcqQuestion.setWeight(mcqDto.getWeight());
    mcqQuestion.setChapterId(mcqDto.getChapterId());
    mcqQuestion.setType(mcqDto.getMcqType().name());
    mcqQuestion.setDifficulty(mcqDto.getDifficulty().name());
    mcqQuestion.setStatus(QuestionStatus.pending.name());

    if (mcqDto instanceof GeneralMCQDto) {
      val generalDetail = ((GeneralMCQDto) mcqDto).getGeneralMCQDetail();
      validateGeneralMcq(generalDetail);
      mcqQuestion.setBaseQuestion(objectMapper.writeValueAsString(generalDetail));
    } else if (mcqDto instanceof PolynomialMCQDto) {
      val polynomialDetail = ((PolynomialMCQDto) mcqDto).getPolynomialMCQDetail();
      validatePolynomial(polynomialDetail);
      mcqQuestion.setBaseQuestion(objectMapper.writeValueAsString(polynomialDetail));
    } else if (mcqDto instanceof StemBasedMCQDto) {
      val stemDetail = ((StemBasedMCQDto) mcqDto).getStemBasedMCQDetail();
      validateStemMcq(stemDetail);
      mcqQuestion.setBaseQuestion(objectMapper.writeValueAsString(stemDetail));
    }

    if (mcqDto.getId() == null) {
      val moderator = getRandomModerator(mcqQuestion.getSubjectId(), mcqQuestion.getCreatedBy());
      mcqQuestion.setModeratedBy(moderator);
      mcqMapper.insert(mcqQuestion);
    } else {
      mcqQuestion.setId(mcqDto.getId());
      mcqMapper.updateByPrimaryKey(mcqQuestion);
    }
    return mcqQuestion;
  }

  private Integer getRandomModerator(Integer subjectId, Integer creator) {
    val allModerators = userService.getModeratorBySubject(subjectId);
    // Remove the creator if he is a moderator
    val refinedModerators = allModerators
        .stream()
        .filter(user -> !user.getId().equals(creator))
        .collect(Collectors.toList());

    if (refinedModerators.size() <= 0) {
      throw new RuntimeException("No moderator exists yet. Please submit question later.");
    }

    int randIndx = new Random().nextInt(refinedModerators.size());
    return refinedModerators.get(randIndx).getId();
  }

  private void validateGeneralMcq(final GeneralMCQDetail detail) {
    if (!isNoneEmpty(detail.getOption1(),
        detail.getOption2(), detail.getOption3(),
        detail.getOption4(), detail.getQuestionBody()) || detail.getAnswer() <= 0) {
      throw new IllegalArgumentException("None of the question field should be empty.");
    }
  }

  private void validatePolynomial(PolynomialMCQDetail detail) {
    if (!isNoneEmpty(detail.getQuestionStatement(), detail.getStatement1(),
        detail.getStatement2(), detail.getStatement3(), detail.getOption1(),
        detail.getOption2(), detail.getOption3(), detail.getOption4(),
        detail.getQuestionBody()) || detail.getAnswer() <= 0) {
      throw new IllegalArgumentException("None of the question field should be empty.");
    }
  }

  private void validateStemMcq(final StemBasedMCQDetail stemDetail) {
    if (isBlank(stemDetail.getStem())) {
      throw new IllegalArgumentException("Provide the stem.");
    }

    final List<GeneralMCQDetail> generalMcqs = stemDetail.getGeneralMcqs();
    final List<PolynomialMCQDetail> polynomialMcqs = stemDetail.getPolynomialMcqs();

    if (isEmpty(generalMcqs) && isEmpty(polynomialMcqs)) {
      throw new IllegalArgumentException("Must have at least one mcq question.");
    }

    if (!isEmpty(generalMcqs)) {
      generalMcqs.forEach(this::validateGeneralMcq);
    }

    if (!isEmpty(polynomialMcqs)) {
      polynomialMcqs.forEach(this::validatePolynomial);
    }
  }

  public ResponseEntity getMcqById(Integer mcqId) throws IOException {

    val mcqQuestion = mcqMapper.selectByPrimaryKey(mcqId);
    if (isNull(mcqQuestion)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No MCQ found with id => " + mcqId);
    }

    val authenticatedUser = userService.getAuthenticatedUser();
// Question creator & moderator of the question can view the question
    if (!authenticatedUser.getId().equals(mcqQuestion.getCreatedBy())) {
      if (!authenticatedUser.getId().equals(mcqQuestion.getModeratedBy())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have access to see this question.");
      }
    }
    return ResponseEntity.ok().body(extractMcqDto(mcqQuestion));
  }

  private MCQDto extractMcqDto(MCQQuestion mcqQuestion) throws IOException {
    MCQDto mcqDto;
    if (mcqQuestion.getType().equals(MCQType.GENERAL.name())) {
      mcqDto = extractGeneralDto(mcqQuestion);
    } else if (mcqQuestion.getType().equals(MCQType.POLYNOMIAL.name())) {
      mcqDto = extractPolynomialDto(mcqQuestion);
    } else {
      mcqDto = extractStemDto(mcqQuestion);
    }
    return mcqDto;
  }

  private MCQDto extractGeneralDto(MCQQuestion mcq) throws IOException {
    GeneralMCQDto dto = new GeneralMCQDto();
    dto.setId(mcq.getId()).setChapterId(mcq.getChapterId())
        .setDifficulty(Difficulty.valueOf(mcq.getDifficulty()))
        .setSubjectId(mcq.getSubjectId()).setCreatedAt(mcq.getCreatedAt())
        .setCreatedBy(mcq.getCreatedBy()).setStatus(mcq.getStatus())
        .setModeratedAt(mcq.getModeratedAt()).setModeratedBy(mcq.getModeratedBy())
        .setMcqType(MCQType.valueOf(mcq.getType())).setWeight(mcq.getWeight());

    dto.setGeneralMCQDetail(objectMapper.readValue(mcq.getBaseQuestion(), GeneralMCQDetail.class));
    return dto;
  }

  private MCQDto extractPolynomialDto(MCQQuestion mcq) throws IOException {
    PolynomialMCQDto dto = new PolynomialMCQDto();
    dto.setId(mcq.getId()).setChapterId(mcq.getChapterId())
        .setDifficulty(Difficulty.valueOf(mcq.getDifficulty()))
        .setSubjectId(mcq.getSubjectId()).setCreatedAt(mcq.getCreatedAt())
        .setCreatedBy(mcq.getCreatedBy()).setStatus(mcq.getStatus())
        .setModeratedAt(mcq.getModeratedAt()).setModeratedBy(mcq.getModeratedBy())
        .setMcqType(MCQType.valueOf(mcq.getType())).setWeight(mcq.getWeight());

    dto.setPolynomialMCQDetail(
        objectMapper.readValue(mcq.getBaseQuestion(), PolynomialMCQDetail.class));
    return dto;
  }

  private MCQDto extractStemDto(MCQQuestion mcq) throws IOException {
    StemBasedMCQDto dto = new StemBasedMCQDto();
    dto.setId(mcq.getId()).setChapterId(mcq.getChapterId())
        .setDifficulty(Difficulty.valueOf(mcq.getDifficulty()))
        .setSubjectId(mcq.getSubjectId()).setCreatedAt(mcq.getCreatedAt())
        .setCreatedBy(mcq.getCreatedBy()).setStatus(mcq.getStatus())
        .setModeratedAt(mcq.getModeratedAt()).setModeratedBy(mcq.getModeratedBy())
        .setMcqType(MCQType.valueOf(mcq.getType())).setWeight(mcq.getWeight());

    dto.setStemBasedMCQDetail(
        objectMapper.readValue(mcq.getBaseQuestion(), StemBasedMCQDetail.class));
    return dto;
  }

  public List<MCQDto> getMcqListByStatus(QuestionStatus status, Integer teacherId) {
    val ex = new MCQQuestionExample();
    ex.createCriteria()
        .andCreatedByEqualTo(teacherId)
        .andStatusEqualTo(status.name());
    ex.setOrderByClause("created_at DESC");
    return mcqMapper.selectByExample(ex)
        .stream()
        .map(mcqQuestion -> {
          try {
            return extractMcqDto(mcqQuestion);
          } catch (IOException e) {
            logger.error("Exception occur => " + e);
            throw new RuntimeException("Question not found.");
          }
        }).collect(toList());
  }

  public ResponseEntity retrieveMcqForModerator(QuestionStatus status) {
    Integer moderatorId = userService.getAuthenticatedUser().getId();
    val ex = new MCQQuestionExample();
    ex.createCriteria()
        .andModeratedByEqualTo(moderatorId)
        .andStatusEqualTo(status.name());
    val allMcqs = mcqMapper.selectByExample(ex);

    val simpleMcqs = allMcqs.stream().map(mcqQuestion -> {
      String partialContent = "No partial content available...";
      final String type = mcqQuestion.getType();
      try {
        partialContent = getPartialContent(type, mcqQuestion.getBaseQuestion());
      } catch (IOException e) {
        logger.debug("Problem occurs during base question de-serialization.");
      }

      return new SimpleQuestionDto()
          .setId(mcqQuestion.getId())
          .setPartialContent(partialContent)
          .setChapterId(mcqQuestion.getChapterId())
          .setSubjectId(mcqQuestion.getSubjectId())
          .setMcqType(type);
    }).collect(Collectors.toList());

    return ResponseEntity.ok(simpleMcqs);
  }

  private String getPartialContent(String type, String baseQuestion) throws IOException {
    if (type.equals(MCQType.GENERAL.name())) {
      val mcq = objectMapper.readValue(baseQuestion, GeneralMCQDetail.class);
      return mcq.getQuestionBody();
    } else if (type.equals(MCQType.POLYNOMIAL.name())) {
      val mcq = objectMapper.readValue(baseQuestion, PolynomialMCQDetail.class);
      return mcq.getQuestionStatement();
    } else {
      val mcq = objectMapper.readValue(baseQuestion, StemBasedMCQDetail.class);
      return mcq.getStem();
    }
  }

}