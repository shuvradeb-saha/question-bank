package spl.question.bank.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

  private final JwtConfig jwtConfig;

  public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
    this.jwtConfig = jwtConfig;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String header = request.getHeader(jwtConfig.getHeader());

    if (header == null || !header.startsWith(jwtConfig.getPrefix())) {
      try {
        filterChain.doFilter(request, response);
      } catch (Exception e) {
        logger.info("Unknown error {}",e);
      }
    }

    String token = header.replace(jwtConfig.getPrefix(), "");

    try {
      Claims claims =
          Jwts.parser()
              .setSigningKey(jwtConfig.getSecret().getBytes())
              .parseClaimsJws(token)
              .getBody();

      String username = claims.getSubject();
      if (username != null) {
        val authorities = (List<String>) claims.get("authorities");

        UsernamePasswordAuthenticationToken auth =
            new UsernamePasswordAuthenticationToken(
                username,
                null,
                authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
        SecurityContextHolder.getContext().setAuthentication(auth);
      }

    } catch (Exception e) {
      SecurityContextHolder.clearContext();
    }
    filterChain.doFilter(request, response);
  }
}
