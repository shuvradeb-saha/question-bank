package spl.question.bank.security;

import static java.util.stream.Collectors.toList;

import java.util.stream.Collectors;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import spl.question.bank.database.model.User;
import spl.question.bank.service.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserService userService;
  private final BCryptPasswordEncoder encoder;
  private final String ROLE_PREFIX = "ROLE_";

  @Autowired
  public UserDetailsServiceImpl(
      final UserService userService,
      final BCryptPasswordEncoder encoder) {
    this.userService = userService;
    this.encoder = encoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userService.getUserByEmail(email);
    val roles = userService.getRolesByUser(user.getId());

    val grantedAuthorities = roles
        .stream()
        .map(role -> new SimpleGrantedAuthority(ROLE_PREFIX + role))
        .collect(toList());

    return new org.springframework.security.core.userdetails.User(user.getEmail(),
        user.getPassword(), grantedAuthorities);
  }
}
