package spl.question.bank.service.similarity;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


  public HashMap<String, Double> calculateTfIDf(
      final List<String> combinedDocTokens,
      final List<String> document,
      final HashMap<Integer, List<String>> allDocuments) {

    HashMap<String, Double> tfIdfMap = new HashMap<>();
    for (String term : combinedDocTokens) {
      double tf = termFrequency(term, document);
      double idf = inverseDocFrequency(term, allDocuments);
      tfIdfMap.put(term, (tf * idf));
    }
    return tfIdfMap;
  }


  public double calculateCosineSimilarity(final List<Double> tfIdfQuery,
                                          final List<Double> tfIdfDb) {
    double dotProductSum = 0.0, cosineSimilarity;
    for (int i = 0; i < tfIdfDb.size(); i++) {
      dotProductSum += (tfIdfDb.get(i) * tfIdfQuery.get(i));
    }
    // rootover(a^2+b^2+c^2)
    double rootSqrQuery = getSqrt(tfIdfQuery);
    double rootSqrDb = getSqrt(tfIdfDb);
    double sqrRtProduct = rootSqrDb * rootSqrQuery;

    cosineSimilarity = dotProductSum / sqrRtProduct;

    return cosineSimilarity;
  }

  private double getSqrt(List<Double> tfIdfVector) {
    double sum = 0.0;
    for (int i = 0; i < tfIdfVector.size(); i++) {
      sum += Math.pow(tfIdfVector.get(i), 2);
    }
    return Math.sqrt(sum);
  }
}
