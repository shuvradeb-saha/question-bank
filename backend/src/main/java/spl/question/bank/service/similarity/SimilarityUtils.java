package spl.question.bank.service.similarity;

import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.model.question.mcq.*;

import java.util.*;

import static java.lang.Character.MIN_VALUE;
import static org.apache.commons.lang3.StringUtils.SPACE;
import static org.apache.commons.lang3.StringUtils.isAlpha;

@Service
public class SimilarityUtils {

  public HashMap<Integer, List<String>> getTokenizedMap(List<MCQDto> questions) {

    val start = System.currentTimeMillis();
    val questionWords = new HashMap<Integer, List<String>>();
    for (int i = 0; i < 10000; i++) {
      List<String> tokens = new ArrayList<>();

      GeneralMCQDetail generalMCQDetail = new GeneralMCQDetail();
      generalMCQDetail.setQuestionBody("তথ্যকে ()*(__)বিশ্লেষণ করলে কী বের হয়ে আসে?");
      generalMCQDetail.setOption1("জ্ঞান");
      generalMCQDetail.setOption2("প্রেক্ষাপট");
      generalMCQDetail.setOption3("ঘটনা");
      generalMCQDetail.setOption4("উপাত্ত");
      generalMCQDetail.setAnswer(4);

      questionWords.put(i, extractFromGeneralMcq(generalMCQDetail));
    }

    System.out.println("Total time = " + (System.currentTimeMillis() - start));
    return questionWords;
  }

  public List<String> extractFromGeneralMcq(GeneralMCQDetail detail) {
    List<String> tokens = new ArrayList<>();
    tokens.addAll(tokenize(detail.getQuestionBody()));
    tokens.addAll(tokenize(detail.getOption1()));
    tokens.addAll(tokenize(detail.getOption2()));
    tokens.addAll(tokenize(detail.getOption3()));
    tokens.addAll(tokenize(detail.getOption4()));
    return tokens;
  }

  public List<String> extractFromPolynomialMcq(PolynomialMCQDetail detail) {
    List<String> tokens = new ArrayList<>();
    tokens.addAll(tokenize(detail.getQuestionStatement()));
    tokens.addAll(tokenize(detail.getStatement1()));
    tokens.addAll(tokenize(detail.getStatement2()));
    tokens.addAll(tokenize(detail.getStatement3()));
    return tokens;
  }

  public List<String> extractFromStemMcq(StemBasedMCQDetail detail) {
    List<String> tokens = new ArrayList<>(tokenize(detail.getStem()));
    final int generalCount = detail.getGeneralMcqs().size();
    if (generalCount > 0) {
      for (val generalMcq : detail.getGeneralMcqs()) {
        tokens.addAll(extractFromGeneralMcq(generalMcq));
      }
    }
    final int polyCount = detail.getPolynomialMcqs().size();
    if (polyCount > 0) {
      for (val polynomialMcq : detail.getPolynomialMcqs()) {
        tokens.addAll(extractFromPolynomialMcq(polynomialMcq));
      }
    }
    return tokens;
  }

  private List<String> tokenize(String questionStr) {
    val nonProcessedTokens = questionStr.trim().split(SPACE);
    val processedTokens = new ArrayList<String>();
    for (String token : nonProcessedTokens) {
      String processedToken;
      if (isAlpha(token)) {
        processedToken = token.toLowerCase();
      } else {
        processedToken = removeBadCharacters(token);
      }
      processedTokens.add(processedToken);
    }
    return processedTokens;
  }

  private String removeBadCharacters(String token) {
    val badChar = "!#$%^&*()_-+|{}[]'`;:<>~?";
    for (int i = 0; i < badChar.length(); i++) {
      for (int j = 0; j < token.length(); j++) {
        if (token.charAt(j) == badChar.charAt(i)) {
          token = token.replace(badChar.charAt(i), MIN_VALUE);
        }
      }
    }
    return token;
  }

}
