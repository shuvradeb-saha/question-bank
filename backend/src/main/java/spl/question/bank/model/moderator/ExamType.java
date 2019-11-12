package spl.question.bank.model.moderator;

import lombok.Getter;

@Getter
public enum ExamType {

  finalExam(5, 110),
  testExam(5, 110),
  preTestExam(5, 110),
  midExam(5, 110),
  weeklyExam(5, 10);

  private int mcqWeight;
  private int cqWeight;

  ExamType(int mcqWeight, int cqWeight) {
    this.mcqWeight = mcqWeight;
    this.cqWeight = cqWeight;
  }
}
