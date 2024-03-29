package spl.question.bank.model.question.mcq;

import lombok.Data;

@Data
public class PolynomialMCQDetail {

  private String questionStatement;
  private String statement1;
  private String statement2;
  private String statement3;
  private String questionBody;
  private String option1;
  private String option2;
  private String option3;
  private String option4;
  private int answer;
}
