package spl.question.bank.security;

import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.val;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
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

    val loginResponse = userService.createLoginResponse(auth);


/*
    val token = userService.getToken(auth);
    val cookie = new Cookie("token", token);
    response.addCookie(cookie);
*/

    response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "*");
    response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));

  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException {
    logger.error(failed.getMessage());
    response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "*");
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    response.getWriter().write(failed.getMessage());
  }

  @Data
  private static class UserCredentials {

    private String username;
    private String password;
  }
}
