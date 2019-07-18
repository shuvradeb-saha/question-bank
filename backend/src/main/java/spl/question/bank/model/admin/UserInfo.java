package spl.question.bank.model.admin;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class UserInfo {

    private Integer id;
    private String email;
    private String name;
    private Integer eiinNumber;
    private String instituteName;
    private List<String> roles;
}
