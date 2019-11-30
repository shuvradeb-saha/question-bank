package spl.question.bank.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.Status;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.service.UserService;

@RestController
@Slf4j
@RequestMapping(path = "/api")
public class SystemUserController {

  private final UserService userService;

  public SystemUserController(final UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(value = "/user",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public LoginResponse getUser(final Authentication authentication) {
    return userService.createLoginResponse(authentication);
  }

  @RequestMapping(value = "/user/{email}", method = RequestMethod.POST)
  public ResponseEntity<String> sendOtpToEmail(@PathVariable String email) {
    return userService.serveOtpForForgetPassword(email);
  }

  @GetMapping("/status")
  public Health getStatus() {
    return Health.up().build();
  }
}
