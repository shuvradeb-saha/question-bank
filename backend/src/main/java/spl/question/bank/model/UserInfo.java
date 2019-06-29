package spl.question.bank.model;

import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.database.model.Role;

@Data
@Accessors(chain = true)
public class UserInfo {

  private String email;
  private String firstName;
  private String lastName;
  private String permanentAddress;
  private String tempAddress;
  private Date birthDate;
  private Date joinDate;
  private Integer eiinNumber;
  private List<Role> roles;
}
