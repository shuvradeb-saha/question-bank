package spl.question.bank.service.similarity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.*;
import spl.question.bank.service.QuestionService;

@Service
@Slf4j
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

    GeneralMCQDto generalMCQDto = new GeneralMCQDto();
    GeneralMCQDetail detail = new GeneralMCQDetail()
        .setQuestionBody("একুশ শতাব্দীতে টিকে থাকতে হলে সবাইকে জানতে হবে-")
        .setOption1("তথ্যপ্রযুক্তির প্রাথমিক বিষয়গুলো")
        .setOption2("যোগাযোগ প্রযুক্তির প্রাথমিক বিষযগুলো")
        .setOption3("তথ্য ও যোগাযোগ প্রযুক্তির প্রাথমিক বিষয়গুলো")
        .setOption4("অর্থনৈতিক বিষয়গুলো")
        .setAnswer(4);
    generalMCQDto.setGeneralMCQDetail(detail);
    extractSimilarQuestions(generalMCQDto);
  }

  public List<Integer> extractSimilarQuestions(MCQDto mcqDto) {
    List<String> queryDocument = new ArrayList<>();
    if (mcqDto instanceof GeneralMCQDto) {
      queryDocument = similarityUtils
          .extractFromGeneralMcq(((GeneralMCQDto) mcqDto).getGeneralMCQDetail());
    } else if (mcqDto instanceof PolynomialMCQDto) {
      queryDocument = similarityUtils
          .extractFromPolynomialMcq(((PolynomialMCQDto) mcqDto).getPolynomialMCQDetail());
    } else if (mcqDto instanceof StemBasedMCQDto) {
      queryDocument = similarityUtils
          .extractFromStemMcq(((StemBasedMCQDto) mcqDto).getStemBasedMCQDetail());
    }

    val questions = questionService.getMcqListByStatus(QuestionStatus.pending, 2);

    HashMap<Integer, List<String>> allDocuments = similarityUtils.getTokenizedMap(questions);

    if (CollectionUtils.isEmpty(allDocuments)) {
      return null;
    }

    for (Map.Entry<Integer, List<String>> docInDb : allDocuments.entrySet()) {
      List<String> combinedDocTokens = combineTokens(queryDocument, docInDb.getValue());
      HashMap<String, Double> tfIdfOfQueryDoc = tfIdfExtractor
          .calculateIfIDf(combinedDocTokens, queryDocument, allDocuments);
      HashMap<String, Double> tfIdfDbDoc = tfIdfExtractor
          .calculateIfIDf(combinedDocTokens, docInDb.getValue(), allDocuments);

      logger.info("TF-IDF -- > query => {} db => {}", tfIdfOfQueryDoc, tfIdfDbDoc);

      double result = tfIdfExtractor.calculateCosineSimilarity(tfIdfOfQueryDoc, tfIdfDbDoc);
      logger.info("Similarity between query and {} = {}", mcqDto.getId(), result);
    }

    /*val similarityUtils.getTokenizedMap(questionService
        .getMcqSBySubjectAndStatus(mcqDto.getSubjectId(), QuestionStatus.approved));*/
    return null;
  }

  private List<String> combineTokens(final List<String> queryDocument, final List<String> dbDoc) {
    List<String> newList = new ArrayList<>();
    for (String term : queryDocument) {
      if (!newList.contains(term)) {
        newList.add(term);
      }
    }
    for (String term : dbDoc) {
      if (!newList.contains(term)) {
        newList.add(term);
      }
    }

    return newList;
  }


}
