package spl.question.bank.model.question.mcq;

import lombok.Data;

import java.util.List;

@Data
public class StemBasedMCQDetail {

  private String stem;
  private List<GeneralMCQDetail> generalMcqs;
  private List<PolynomialMCQDetail> polynomialMcqs;
}
