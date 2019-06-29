package spl.question.bank.model.login;

import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.database.model.User;

@Data
@Accessors(chain = true)
public class LoginResponse {

  private User user;
  private List<String> roles;
  private String token;
}
