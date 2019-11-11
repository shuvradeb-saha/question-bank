package spl.question.bank.service.similarity;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Utils {
  public static <K, V> Map<K, V> putFirstEntries(int max, HashMap<K, V> source) {
    int count = 0;
    HashMap<K, V> target = new HashMap<>();
    for (Map.Entry<K, V> entry : source.entrySet()) {
      if (count >= max) break;
      target.put(entry.getKey(), entry.getValue());
      count++;
    }
    return Collections.unmodifiableMap(target);
  }
}
