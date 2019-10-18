package spl.question.bank.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.model.MCQQuestion;
import spl.question.bank.model.question.Difficulty;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import static java.util.Objects.isNull;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNoneEmpty;
import static org.springframework.util.CollectionUtils.isEmpty;

@Service
@Slf4j
public class QuestionService {

  private final MCQQuestionMapper mcqMapper;
  private final ObjectMapper objectMapper;

  public QuestionService(final MCQQuestionMapper mcqMapper) {
    this.mcqMapper = mcqMapper;
    this.objectMapper = new ObjectMapper();
  }

  public MCQQuestion saveMcq(final MCQDto mcqDto) throws JsonProcessingException {
    val mcqQuestion = new MCQQuestion();

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
      mcqMapper.insert(mcqQuestion);
    } else {
      mcqQuestion.setId(mcqDto.getId());
      // mcqMapper.updateByPrimaryKey(mcqQuestion);
    }
    return mcqQuestion;
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

  public MCQDto
  getMcqById(Integer mcqId) throws IOException {
    val mcqQuestion = mcqMapper.selectByPrimaryKey(mcqId);
    if (isNull(mcqQuestion)) {
      throw new IllegalArgumentException("No MCQ found with id => " + mcqId);
    }
    MCQDto mcqDto = null;
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

    dto.setPolynomialMCQDetail(objectMapper.readValue(mcq.getBaseQuestion(), PolynomialMCQDetail.class));
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

    dto.setStemBasedMCQDetail(objectMapper.readValue(mcq.getBaseQuestion(), StemBasedMCQDetail.class));
    return dto;
  }
}