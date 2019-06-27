package spl.question.bank.model;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import java.io.Serializable;
import java.util.List;
import lombok.Data;
import spl.question.bank.database.model.Role;
import spl.question.bank.database.model.User;

@Data
public class UserDto implements Serializable {
  @JsonUnwrapped
  User user;
  List<Role> roleIds;
}
