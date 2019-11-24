package spl.question.bank.service.similarity;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.TreeSet;

@Service
@Slf4j
public class Stemmer {

  private ArrayList<String> lines;
  private ArrayList<ArrayList<String>> pass;

  private static final String CURLY_OPEN = "{";
  private static final String CURLY_CLOSE = "}";
  private TreeSet<Character> st;
  private HashMap<String, String> replaceRule;

  public Stemmer() throws IOException {
    replaceRule = new HashMap<>();
    dependantCharSetInstallation();

    Charset charset = StandardCharsets.UTF_8;
    lines = new ArrayList<>();
    pass = new ArrayList<>();
    File file = ResourceUtils.getFile("classpath:common.rules");
    InputStream inputStream = new FileInputStream(file);

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, charset))) {
      String line = null;
      while ((line = reader.readLine()) != null) {
        line = whiteSpaceTrim(line);
        line = commentTrim(line);
        if (line.equals("")) continue;
        String replace = extractReplaceRule(line);
        line = line.replaceAll("->.*", "");
        if (!replace.equals("")) {
          replaceRule.put(line, replace);
        }
        lines.add(line);
      }
    } catch (IOException x) {
      x.printStackTrace();
    }

    int cnt = 0;
    for (int i = 0; i < lines.size(); i++) {
      if (lines.get(i).equals(CURLY_OPEN)) {
        pass.add(new ArrayList<>());
        i++;
        while (i < lines.size() && !lines.get(i).equals(CURLY_CLOSE)) {
          pass.get(cnt).add(lines.get(i));
          i++;
        }
        cnt++;
      }
    }
    logger.info("pass => {}", pass.toString());
  }

  private String whiteSpaceTrim(String str) {
    return str.replaceAll("[\t' ']+", "");
  }

  private String commentTrim(String str) {
    return str.replaceAll("#.*", "");
  }

  private String extractReplaceRule(String str) {
    if (str.matches(".*->.*")) {
      String[] l = str.split("->");
      return l[1];
    }
    return "";
  }

  public String stemOfWord(String word) {
    int i, j;

    for (i = 0; i < pass.size(); i++) {
      for (j = 0; j < pass.get(i).size(); j++) {
        String replacePrefix = pass.get(i).get(j);

        String matcher = ".*" + replacePrefix + "$";
        if (word.matches(matcher)) {
          int indx = word.length() - replacePrefix.length();
          if (replaceRule.containsKey(replacePrefix)) {
            String replaceSuffix = replaceRule.get(replacePrefix);
            StringBuilder builder = new StringBuilder(word);
            int k, l;
            for (k = indx, l = 0; k < indx + replaceSuffix.length(); k++, l++) {
              if (replaceSuffix.charAt(l) != '.') {
                builder.setCharAt(k, replaceSuffix.charAt(l));
              }
            }
            word = builder.substring(0, k);
          } else if (
          /* escape.contains(pass.get(i).get(j)) || */ check(word.substring(0, indx))) {
            word = word.substring(0, indx);
          }

          break;
        }
      }
    }

    return word;
  }

  private void dependantCharSetInstallation() {
    st = new TreeSet<Character>();
    st.add('া');
    st.add('ি');
    st.add('ী');
    st.add('ে');
    st.add('ু');
    st.add('ূ');
    st.add('ো');
  }

  private boolean check(String word) {
    int i;
    int wordLength = 0;

    for (i = 0; i < word.length(); i++) {
      if (st.contains(word.charAt(i))) continue;
      wordLength++;
    }
    return wordLength >= 1;
  }
}
