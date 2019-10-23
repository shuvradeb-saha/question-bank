package spl.question.bank.service.similarity;

import static java.util.stream.Collectors.toMap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.GeneralMCQDetail;
import spl.question.bank.model.question.mcq.GeneralMCQDto;
import spl.question.bank.model.question.mcq.MCQDto;
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

  public List<Integer> extractSimilarQuestions(MCQDto queryMcqDto) {

    List<String> tokenizedQuery = similarityUtils.extractTokenFromDto(queryMcqDto);

    // Extract all from db
    val questions = questionService.getMcqListByStatus(QuestionStatus.pending, 2);

    // Create token from db
    HashMap<Integer, List<String>> allTokenizedDocuments = similarityUtils
        .getTokenizedMap(questions);

    // If no question in db then return empty list
    if (CollectionUtils.isEmpty(allTokenizedDocuments)) {
      return Collections.emptyList();
    }

    HashMap<Integer, Double> dtoScore = new HashMap<>();

    for (Entry<Integer, List<String>> docInDb : allTokenizedDocuments.entrySet()) {

      List<String> combinedDocTokens = combineTokens(tokenizedQuery, docInDb.getValue());
      HashMap<String, Double> tfIdfOfQueryDoc = tfIdfExtractor
          .calculateTfIDf(combinedDocTokens, tokenizedQuery, allTokenizedDocuments);
      HashMap<String, Double> tfIdfDbDoc = tfIdfExtractor
          .calculateTfIDf(combinedDocTokens, docInDb.getValue(), allTokenizedDocuments);

      List<Double> tfIdfQueryValues = new ArrayList<>(tfIdfOfQueryDoc.values());
      List<Double> tfIdfDbValues = new ArrayList<>(tfIdfDbDoc.values());

      double similarityScore = tfIdfExtractor
          .calculateCosineSimilarity(tfIdfQueryValues, tfIdfDbValues);
      logger
          .info("Similarity between query question and {} = {}", docInDb.getKey(), similarityScore);
      dtoScore.put(docInDb.getKey(), similarityScore);
    }

    /*val similarityUtils.getTokenizedMap(questionService
        .getMcqSBySubjectAndStatus(mcqDto.getSubjectId(), QuestionStatus.approved));*/

    val sortedMap = dtoScore.entrySet()
        .stream()
        .sorted(Entry.<Integer, Double>comparingByValue()
            .reversed())
        .collect(toMap(Entry::getKey,
            Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

    if(sortedMap.size() > 10) {

    }
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
