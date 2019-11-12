package spl.question.bank.service.similarity;

import java.io.IOException;

public class Main {
  public static void main(String[] args) throws IOException {
    System.out.println("hello");
    Stemmer stemmer = new Stemmer();
    System.out.println(stemmer.stemOfWord("abs"));
  }
}
