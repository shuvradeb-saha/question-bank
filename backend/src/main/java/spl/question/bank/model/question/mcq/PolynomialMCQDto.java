package spl.question.bank.model.question.mcq;


import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PolynomialMCQDto implements MCQDto{
  private int id;
  private MCQType mcqType;

  @JsonUnwrapped
  private PolynomialMCQDetail polynomialMCQDetail;

  @Override
  public MCQType getMCQType() {
    return MCQType.POLYNOMIAL;
  }
}
