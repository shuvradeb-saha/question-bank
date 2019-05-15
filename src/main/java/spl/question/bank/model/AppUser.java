package spl.question.bank.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AppUser {
    private Integer id;
    private String username;
    private String password;
    private List<String> roles;
}
