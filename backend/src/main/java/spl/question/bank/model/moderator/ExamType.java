package spl.question.bank.model.moderator;

import lombok.Getter;

@Getter
public enum ExamType {
  finalExam(5, 10),
  testExam(5, 50),
  preTestExam(5, 50),
  midExam(5, 50),
  weeklyExam(5, 10);

  private int mcqWeight;
  private int cqWeight;

  ExamType(int mcqWeight, int cqWeight) {
    this.mcqWeight = mcqWeight;
    this.cqWeight = cqWeight;
  }
}
