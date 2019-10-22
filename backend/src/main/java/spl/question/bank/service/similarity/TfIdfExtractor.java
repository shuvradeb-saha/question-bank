package spl.question.bank.service.similarity;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class TfIdfExtractor {

  public double termFrequency(String term, List<String> document) {
    long count = document.stream()
        .filter(s -> s.equals(term))
        .count();
    return (double) count / document.size();
  }

  public double inverseDocFrequency(String term, HashMap<Integer, List<String>> allDocuments) {
    long noOfDocWithTerm = 0;
    for (List<String> document : allDocuments.values()) {
      if (document.contains(term)) {
        noOfDocWithTerm++;
      }
    }

    if (noOfDocWithTerm > 0) {
      return 1 + Math.log((double) allDocuments.size() / noOfDocWithTerm);
    } else {
      return 1.0;
    }
  }


  public HashMap<String, Double> calculateIfIDf(
      final List<String> document,
      final HashMap<Integer, List<String>> allDocuments) {

    HashMap<String, Double> tfIdfMap = new HashMap<>();
    for (String term : document) {
      double tf = termFrequency(term, document);
      double idf = inverseDocFrequency(term, allDocuments);
      tfIdfMap.put(term, (tf * idf));
    }
    return tfIdfMap;
  }
}
