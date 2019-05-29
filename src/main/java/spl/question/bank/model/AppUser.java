package spl.question.bank.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@Data
public class AppUser implements Serializable {
    private Integer id;
    private String username;
    private String password;
    private List<String> roles;
}
