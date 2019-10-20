package spl.question.bank.service.similarity;

import java.util.List;

import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.QuestionService;

@Service
public class SimilarityService {

  private SimilarityUtils similarityUtils = new SimilarityUtils();

  private final QuestionService questionService;

  public SimilarityService(QuestionService questionService) {
    this.questionService = questionService;
  }

  public List<Integer> extractSimilarQuestions(MCQDto mcqDto) {
    // Todo => Complete this

    /*val similarityUtils.getTokenizedMap(questionService
        .getMcqSBySubjectAndStatus(mcqDto.getSubjectId(), QuestionStatus.approved));*/
    return null;
  }


}
