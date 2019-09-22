package spl.question.bank.service.similarity;

import lombok.val;
import spl.question.bank.model.question.mcq.GeneralMCQDetail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static java.lang.Character.MIN_VALUE;
import static org.apache.commons.lang3.StringUtils.SPACE;
import static org.apache.commons.lang3.StringUtils.isAlpha;

public class Main {

    public static HashMap<Integer, List<String>> extractWords() throws IllegalAccessException {
        val start = System.currentTimeMillis();
        val questionWords = new HashMap<Integer, List<String>>();
        for (int i = 0; i < 10; i++) {
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
            questionWords.put(i, tokens);
        }

        System.out.println("Total time = " + (System.currentTimeMillis() - start));
        return questionWords;
    }

    private static ArrayList<String> getProcessedTokens(String questionBody) {

        val nonProcessedTokens = questionBody.trim().split(SPACE);
        val processedTokens = new ArrayList<String>();
        val badChar = "!#$%^&*()_-+|{}[]'`;:<>~?";
        for (String token : nonProcessedTokens) {
            String processedToken;
            if (isAlpha(token)) {
                processedToken = token.toLowerCase();
            } else {
                for (int i = 0; i < badChar.length(); i++) {
                    for (int j = 0; j < token.length(); j++) {
                        if (token.charAt(j) == badChar.charAt(i)) {
                            token = token.replace(badChar.charAt(i), MIN_VALUE);
                        }
                    }
                }
                processedToken = token;
            }
            processedTokens.add(processedToken);
        }
        return processedTokens;
    }


}
