package spl.question.bank.service.similarity;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.question.mcq.MCQDto;
import spl.question.bank.service.CqService;
import spl.question.bank.service.McqService;

import java.util.*;
import java.util.Map.Entry;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;

@Service
@Slf4j
public class SimilarityService {

  private final SimilarityUtils similarityUtils;
  private final McqService mcqService;
  private final TfIdfExtractor tfIdfExtractor;
  private final CqService cqService;

  public SimilarityService(
      SimilarityUtils similarityUtils,
      McqService mcqService,
      TfIdfExtractor tfIdfExtractor,
      CqService cqService) {
    this.similarityUtils = similarityUtils;
    this.mcqService = mcqService;
    this.tfIdfExtractor = tfIdfExtractor;
    this.cqService = cqService;
  }

  public List<CQQuestion> extractSimilarCq(CQQuestion cq) {
    List<String> tokenizedQuery = similarityUtils.extractTokenFromCq(cq);
    val questions =
        cqService.getCQListByStatusAndSubject(cq.getSubjectId(), QuestionStatus.approved);
    // If no question in db then return empty list
    if (CollectionUtils.isEmpty(questions)) {
      return Collections.emptyList();
    }
    HashMap<Integer, List<String>> allTokenizedDocuments = new HashMap<>();
    questions.forEach(
        cqQuestion -> {
          val tokenList = similarityUtils.extractTokenFromCq(cqQuestion);
          allTokenizedDocuments.put(cqQuestion.getId(), tokenList);
        });

    HashMap<Integer, Double> cqScore =
        calculateSimilarityScores(tokenizedQuery, allTokenizedDocuments);

    val sortedMap =
        cqScore.entrySet().stream()
            .sorted(Entry.<Integer, Double>comparingByValue().reversed())
            .collect(toMap(Entry::getKey, Entry::getValue, (e1, e2) -> e1, HashMap::new));

    if (sortedMap.size() > 10) {
      return extractSimilarCqFromScore(questions, Utils.putFirstEntries(10, sortedMap));
    } else return extractSimilarCqFromScore(questions, Collections.unmodifiableMap(sortedMap));
  }

  public List<MCQDto> extractSimilarMcq(MCQDto queryMcqDto) {
    List<String> tokenizedQuery = similarityUtils.extractTokenFromDto(queryMcqDto);
    // Extract all approved mcq of this subject from db
    val questions =
        mcqService.getMcqBySubjectAndStatus(queryMcqDto.getSubjectId(), QuestionStatus.approved);
    // If no question in db then return empty list
    if (CollectionUtils.isEmpty(questions)) {
      return Collections.emptyList();
    }
    // Create token from db
    HashMap<Integer, List<String>> allTokenizedDocuments =
        similarityUtils.getTokenizedMap(questions);

    HashMap<Integer, Double> dtoScore =
        calculateSimilarityScores(tokenizedQuery, allTokenizedDocuments);

    val sortedMap =
        dtoScore.entrySet().stream()
            .sorted(Entry.<Integer, Double>comparingByValue().reversed())
            .collect(toMap(Entry::getKey, Entry::getValue, (e1, e2) -> e1, HashMap::new));

    if (sortedMap.size() > 10) {
      return extractSimilarDtoFromScore(questions, Utils.putFirstEntries(10, sortedMap));
    } else return extractSimilarDtoFromScore(questions, Collections.unmodifiableMap(sortedMap));
  }

  private HashMap<Integer, Double> calculateSimilarityScores(
      List<String> tokenizedQuery, HashMap<Integer, List<String>> allTokenizedDocuments) {
    HashMap<Integer, Double> dtoScore = new HashMap<>();
    for (Entry<Integer, List<String>> docInDb : allTokenizedDocuments.entrySet()) {

      List<String> combinedDocTokens = combineTokens(tokenizedQuery, docInDb.getValue());
      HashMap<String, Double> tfIdfOfQueryDoc =
          tfIdfExtractor.calculateTfIDf(combinedDocTokens, tokenizedQuery, allTokenizedDocuments);
      HashMap<String, Double> tfIdfDbDoc =
          tfIdfExtractor.calculateTfIDf(
              combinedDocTokens, docInDb.getValue(), allTokenizedDocuments);

      List<Double> tfIdfQueryValues = new ArrayList<>(tfIdfOfQueryDoc.values());
      List<Double> tfIdfDbValues = new ArrayList<>(tfIdfDbDoc.values());

      double similarityScore =
          tfIdfExtractor.calculateCosineSimilarity(tfIdfQueryValues, tfIdfDbValues);
      logger.info(
          "Similarity between query question and {} = {}", docInDb.getKey(), similarityScore);
      if (similarityScore > 0.3) dtoScore.put(docInDb.getKey(), similarityScore);
    }
    return dtoScore;
  }

  private List<MCQDto> extractSimilarDtoFromScore(
      List<MCQDto> questions, Map<Integer, Double> sortedScoreMap) {
    return sortedScoreMap.keySet().stream()
        .map(
            id ->
                questions.stream()
                    .filter(mcqDto -> mcqDto.getId().equals(id))
                    .findFirst()
                    .orElse(null))
        .collect(toList());
  }

  private List<CQQuestion> extractSimilarCqFromScore(
      List<CQQuestion> questions, Map<Integer, Double> sortedScoreMap) {
    return sortedScoreMap.keySet().stream()
        .map(id -> questions.stream().filter(cq -> cq.getId().equals(id)).findFirst().orElse(null))
        .collect(toList());
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
