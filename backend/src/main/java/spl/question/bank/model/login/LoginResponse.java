package spl.question.bank.model.login;

import java.util.Collection;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;

@Data
@Accessors(chain = true)
public class LoginResponse {
  String user;
  Collection<? extends GrantedAuthority> roles;
  String token;
}
