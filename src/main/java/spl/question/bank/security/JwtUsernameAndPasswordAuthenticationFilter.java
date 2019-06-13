package spl.question.bank.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.xml.internal.org.jvnet.mimepull.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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

    LoginResponse loginResponse = new LoginResponse();
    loginResponse
        .setUser(auth.getName())
        .setToken(token)
        .setRoles(null);
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
