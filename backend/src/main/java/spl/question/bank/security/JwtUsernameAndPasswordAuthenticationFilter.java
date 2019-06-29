package spl.question.bank.security;

import static java.util.stream.Collectors.toList;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.val;
import lombok.var;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import spl.question.bank.model.UserDto;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.service.UserService;

public class JwtUsernameAndPasswordAuthenticationFilter extends
    UsernamePasswordAuthenticationFilter {

  private AuthenticationManager authenticationManager;
  private final JwtConfig jwtConfig;
  private final UserService userService;

  public JwtUsernameAndPasswordAuthenticationFilter(
      AuthenticationManager authenticationManager,
      JwtConfig jwtConfig,
      final UserService userService) {
    this.authenticationManager = authenticationManager;
    this.jwtConfig = jwtConfig;
    this.userService = userService;
    this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getUri(),
        HttpMethod.POST.name()));
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response)
      throws AuthenticationException {
    try {
      UserCredentials credentials = new ObjectMapper().readValue(request.getInputStream(),
          UserCredentials.class);
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
          credentials.getUsername(), credentials.getPassword(), Collections.emptyList());
      return authenticationManager.authenticate(authToken);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }

  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain, Authentication auth) throws IOException {
    long now = System.currentTimeMillis();
    val token = Jwts.builder()
        .setSubject(auth.getName())
        .claim("authorities", auth.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .collect(toList()))
        .setIssuedAt(new Date(now))
        .setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))  // in milliseconds
        .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
        .compact();

    val user = userService.getUserByEmail(auth.getName());
    user.setPassword("");
    val roles = userService.getRolesByUser(user.getId());

    var loginResponse = new LoginResponse();
    loginResponse
        .setUser(user)
        .setRoles(roles)
        .setToken(token);

    response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
    response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));

  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    logger.error(failed.getMessage());
    response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    response.getWriter().write(failed.getMessage());
  }

  @Data
  private static class UserCredentials {

    private String username;
    private String password;
  }
}
