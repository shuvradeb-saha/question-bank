package spl.question.bank.model.admin;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.database.model.Role;
import spl.question.bank.database.model.User;

@Data
@Accessors(chain = true)
public class UserDto implements Serializable {
  @JsonUnwrapped
  User user;
  List<Role> roles;
}
