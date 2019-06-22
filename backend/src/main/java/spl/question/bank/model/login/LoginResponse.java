package spl.question.bank.model.login;

import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.model.UserInfo;

@Data
@Accessors(chain = true)
public class LoginResponse {

  private UserInfo userInfo;
  private String token;
}
