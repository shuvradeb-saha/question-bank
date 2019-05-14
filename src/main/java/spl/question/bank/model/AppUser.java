package spl.question.bank.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AppUser {
    private Integer id;
    private String username;
    private String password;
    private String role;//Todo -- make role an array of string


}
