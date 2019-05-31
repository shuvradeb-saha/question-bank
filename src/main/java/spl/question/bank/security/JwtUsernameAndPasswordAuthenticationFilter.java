package spl.question.bank.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;
import spl.question.bank.model.login.LoginResponse;

public class JwtUsernameAndPasswordAuthenticationFilter extends
    UsernamePasswordAuthenticationFilter {

  private AuthenticationManager authenticationManager;
  private final JwtConfig jwtConfig;

  public JwtUsernameAndPasswordAuthenticationFilter(
      AuthenticationManager authenticationManager, JwtConfig jwtConfig) {
    this.authenticationManager = authenticationManager;
    this.jwtConfig = jwtConfig;
    this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getUri(),
        "POST"));
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
    String token = Jwts.builder()
        .setSubject(auth.getName())
        // Convert to list of strings.
        // This is important because it affects the way we get them back in the Gateway.
        .claim("authorities", auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
        .setIssuedAt(new Date(now))
        .setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))  // in milliseconds
        .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
        .compact();

    // Add token to header

    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setUser(auth.getName())
        .setToken(token)
        .setRoles(auth.getAuthorities());

    response.getWriter().write(new ObjectMapper().writeValueAsString(loginResponse));

    response.addHeader("user", auth.getName());
    response.addHeader(jwtConfig.getHeader(), jwtConfig.getPrefix() + token);
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
      HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    logger.error(failed.getMessage());
    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    response.setHeader("AuthError", failed.getMessage());
  }

  @Data
  private static class UserCredentials {

    private String username;
    private String password;
  }
}
