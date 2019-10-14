package spl.question.bank.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.model.MCQQuestion;
import spl.question.bank.model.question.mcq.GeneralMCQDto;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.model.question.mcq.PolynomialMCQDto;
import spl.question.bank.model.question.mcq.StemBasedMCQDto;

@Service
@Slf4j
public class QuestionService {

  private final MCQQuestionMapper mcqMapper;
  private final ObjectMapper objectMapper;

  public QuestionService(final MCQQuestionMapper mcqMapper) {
    this.mcqMapper = mcqMapper;
    this.objectMapper = new ObjectMapper();
  }

  public MCQDto saveMcq(final MCQDto mcqDto) throws JsonProcessingException {
    val mcqQuestion = new MCQQuestion();

    mcqQuestion.setApprovedAt(mcqDto.getApprovedAt());
    mcqQuestion.setApprovedBy(mcqDto.getApprovedBy());
    mcqQuestion.setCreatedAt(mcqDto.getCreatedAt());
    mcqQuestion.setCreatedBy(mcqDto.getCreatedBy());
    mcqQuestion.setSubjectId(mcqDto.getSubjectId());
    mcqQuestion.setWeight(mcqDto.getWeight());
    mcqQuestion.setChapterId(mcqDto.getChapterId());
    mcqQuestion.setType(mcqDto.getMcqType().name());

    if (mcqDto instanceof GeneralMCQDto) {
      mcqQuestion
          .setBaseQuestion(objectMapper
              .writeValueAsString(((GeneralMCQDto) mcqDto).getGeneralMCQDetail()));
    } else if (mcqDto instanceof PolynomialMCQDto) {
      mcqQuestion
          .setBaseQuestion(objectMapper
              .writeValueAsString(((PolynomialMCQDto) mcqDto).getPolynomialMCQDetail()));
    } else if (mcqDto instanceof StemBasedMCQDto) {
      mcqQuestion
          .setBaseQuestion(objectMapper
              .writeValueAsString(((StemBasedMCQDto) mcqDto).getStemBasedMCQDetail()));
    }

    if(mcqDto.getId() == null) {
      mcqMapper.insert(mcqQuestion);
    } else {
      mcqQuestion.setId(mcqDto.getId());
      mcqMapper.updateByPrimaryKey(mcqQuestion);
    }
    return mcqDto;
  }
}