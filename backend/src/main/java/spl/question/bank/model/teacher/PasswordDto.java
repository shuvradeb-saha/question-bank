package spl.question.bank.model.teacher;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PasswordDto {
  private Integer userId;
  private String oldPassword;
  private String newPassword;
  private String confPassword;
}
