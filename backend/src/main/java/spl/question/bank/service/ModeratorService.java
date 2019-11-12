package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.CQQuestionMapper;
import spl.question.bank.database.client.MCQQuestionMapper;
import spl.question.bank.database.model.MCQQuestion;
import spl.question.bank.model.moderator.SimilarMcqDto;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.QuestionType;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.similarity.SimilarityService;

import java.io.IOException;
import java.util.Date;
import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Slf4j
public class ModeratorService {
  private final SimilarityService similarityService;
  private final MCQQuestionMapper mcqQuestionMapper;
  private final CQQuestionMapper cqQuestionMapper;
  private final McqService mcqService;

  public ModeratorService(SimilarityService similarityService,
                          MCQQuestionMapper mcqQuestionMapper,
                          CQQuestionMapper cqQuestionMapper,
                          McqService mcqService) {
    this.similarityService = similarityService;
    this.mcqQuestionMapper = mcqQuestionMapper;
    this.cqQuestionMapper = cqQuestionMapper;
    this.mcqService = mcqService;
  }

  public ResponseEntity getSimilarMcqs(Integer mcqId) throws IOException {
    val mcqRes = mcqService.getMcqById(mcqId);
    if (!mcqRes.getStatusCode().is2xxSuccessful()) {
      return mcqRes;
    }
    MCQDto newMcqDto = (MCQDto) mcqRes.getBody();
    val similarMcqs = similarityService.extractSimilarQuestions(newMcqDto);
    SimilarMcqDto similarMcqDto = new SimilarMcqDto();
    similarMcqDto.setNewMcq(newMcqDto).setSimilarMcqs(similarMcqs);
    return ResponseEntity.ok(similarMcqDto);
  }

  public ResponseEntity changeQuestionStatus(Integer questionId,
                                             QuestionType questionType,
                                             QuestionStatus status) {
    if (questionType.equals(QuestionType.MCQ)) {
      MCQQuestion mcqQuestion = mcqQuestionMapper.selectByPrimaryKey(questionId);
      if (Objects.isNull(mcqQuestion)) {
        return ResponseEntity.status(NOT_FOUND).body("No Mcq found with id = " + questionId);
      }
      if (mcqQuestion.getStatus().equals(status.name())) {
        return ResponseEntity.status(BAD_REQUEST).body("Mcq has already " + status.name());
      }

      mcqQuestion.setStatus(status.name());
      mcqQuestion.setModeratedAt(new Date(System.currentTimeMillis()));
      mcqQuestionMapper.updateByPrimaryKey(mcqQuestion);
      return ResponseEntity.ok(String.format("Mcq submission has %s.", status.name()));
    } else {
      return null;
    }
  }
}
