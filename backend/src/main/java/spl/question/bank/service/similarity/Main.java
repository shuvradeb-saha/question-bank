package spl.question.bank.service.similarity;

import static java.lang.Character.MIN_VALUE;
import static org.apache.commons.lang3.StringUtils.isAlpha;

import java.awt.SystemTray;
import java.util.ArrayList;
import java.util.List;
import lombok.val;
import spl.question.bank.model.question.mcq.GeneralMCQDetail;

public class Main {

  public static void main(String[] args) throws IllegalAccessException {
    // 1 lakh time take 6-7 sec to compute
    val start = System.currentTimeMillis();
    for (int i = 0; i < 100000; i++) {
      List<String> tokens = new ArrayList<>();

      GeneralMCQDetail generalMCQDetail = new GeneralMCQDetail();
      generalMCQDetail.setQuestionBody("তথ্যকে ()*(__)বিশ্লেষণ করলে কী বের হয়ে আসে?");
      generalMCQDetail.setOption1("জ্ঞান");
      generalMCQDetail.setOption2("প্রেক্ষাপট");
      generalMCQDetail.setOption3("ঘটনা");
      generalMCQDetail.setOption4("উপাত্ত");
      generalMCQDetail.setAnswer(4);

      // Reflection
      Class cls = generalMCQDetail.getClass();
      for (val field : cls.getDeclaredFields()) {
        if (field.getName().equals("answer")) {
          continue;
        }
        field.setAccessible(true);
        Object value = field.get(generalMCQDetail);
        val fieldTokens = getProcessedTokens(value.toString());
        tokens.addAll(fieldTokens);
      }
      System.out.println();
      System.out.println(tokens.size());
      tokens.forEach(System.out::println);
      System.out.println();
    }
    System.out.println("Total time = " + (System.currentTimeMillis() - start));
  }

  private static ArrayList<String> getProcessedTokens(String questionBody) {

    val nonProcessedTokens = questionBody.trim().split(" ");
    val processedTokens = new ArrayList<String>();
    val badChar = "!#$%^&*()_-+|{}[]'`;:<>~?";
    for (String token : nonProcessedTokens) {
      if (isAlpha(token)) {
        processedTokens.add(token.toLowerCase());
      } else {
        for (int i = 0; i < badChar.length(); i++) {
          for (int j = 0; j < token.length(); j++) {
            if (token.charAt(j) == badChar.charAt(i)) {
              token = token.replace(badChar.charAt(i), MIN_VALUE);
            }
          }
        }

        processedTokens.add(token);
      }

    }

    return processedTokens;
  }


}
