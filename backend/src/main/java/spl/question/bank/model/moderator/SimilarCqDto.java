package spl.question.bank.model.moderator;

import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.model.question.mcq.MCQDto;

import java.util.List;

@Data
@Accessors(chain = true)
public class SimilarCqDto {
  private CQQuestion newCq;
  private List<CQQuestion> similarCqs;
}
