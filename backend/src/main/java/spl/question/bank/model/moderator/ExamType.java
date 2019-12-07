package spl.question.bank.model.moderator;

import lombok.Getter;

@Getter
public enum ExamType {
  finalExam(5, 10, "বার্ষিক পরীক্ষা"),
  testExam(5, 50, "নির্বাচনী পরীক্ষা"),
  midExam(5, 50,"অর্ধ-বার্ষিক পরীক্ষা");

  private int mcqWeight;
  private int cqWeight;
  private String label;

  ExamType(int mcqWeight, int cqWeight, String label) {
    this.mcqWeight = mcqWeight;
    this.cqWeight = cqWeight;
    this.label = label;
  }
}
