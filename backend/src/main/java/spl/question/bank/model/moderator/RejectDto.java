package spl.question.bank.model.moderator;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class RejectDto {
  private String rejectCause;
}
