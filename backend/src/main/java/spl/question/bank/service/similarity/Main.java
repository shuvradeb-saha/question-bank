package spl.question.bank.service.similarity;

import java.util.Date;

public class Main {
  public static void main(String[] args) {
    Date date = new Date();
    long dt = date.getTime() + (2 * 60 * 1000);
    Date date2 = new Date(dt);
    boolean flag = date2.after(date);
    System.out.println(date + " -- " + date2 + " => " + flag);
  }
}
