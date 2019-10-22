package spl.question.bank.service.similarity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import spl.question.bank.model.question.mcq.*;
import spl.question.bank.service.QuestionService;

@Service
public class SimilarityService {

  private final SimilarityUtils similarityUtils;
  private final QuestionService questionService;
  private final TfIdfExtractor tfIdfExtractor;
  public SimilarityService(SimilarityUtils similarityUtils,
                           QuestionService questionService,
                           TfIdfExtractor tfIdfExtractor) {
    this.similarityUtils = similarityUtils;
    this.questionService = questionService;
    this.tfIdfExtractor = tfIdfExtractor;
  }

  public List<Integer> extractSimilarQuestions(MCQDto mcqDto) {
    // Todo => Complete this
    List<String> queryDocument = new ArrayList<String>();
    if (mcqDto instanceof GeneralMCQDto) {
      queryDocument = similarityUtils
          .extractFromGeneralMcq(((GeneralMCQDto) mcqDto).getGeneralMCQDetail());
    }

    if (mcqDto instanceof PolynomialMCQDto) {
      queryDocument = similarityUtils
          .extractFromPolynomialMcq(((PolynomialMCQDto) mcqDto).getPolynomialMCQDetail());
    }

    if (mcqDto instanceof StemBasedMCQDto) {
      queryDocument = similarityUtils
          .extractFromStemMcq(((StemBasedMCQDto) mcqDto).getStemBasedMCQDetail());
    }

    HashMap<Integer , List<String>> allDocuments = similarityUtils.getTokenizedMap(null);
    HashMap<String, Double> tfIdfOfQueryDoc = tfIdfExtractor.calculateIfIDf(queryDocument, allDocuments);
    //todo => create hashmap inside loop only
    for (List<String> docInDb : allDocuments.values()) {
      HashMap<String, Double> tfIdfDbDoc = tfIdfExtractor.calculateIfIDf(docInDb, allDocuments);
      
    }

    /*val similarityUtils.getTokenizedMap(questionService
        .getMcqSBySubjectAndStatus(mcqDto.getSubjectId(), QuestionStatus.approved));*/
    return null;
  }


}
