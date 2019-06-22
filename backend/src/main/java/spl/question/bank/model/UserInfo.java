package spl.question.bank.model;

import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserInfo {

  private String firstName;
  private String lastName;
  private List<String> roles;
  private String permanentAddress;
  private String tempAddress;
  private Date birthDate;
  private Date joinDate;
}
