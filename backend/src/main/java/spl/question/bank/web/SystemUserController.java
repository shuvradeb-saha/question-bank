package spl.question.bank.web;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.Status;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.model.teacher.PasswordDto;
import spl.question.bank.service.UserService;

@RestController
@Slf4j
@RequestMapping(path = "/api")
public class SystemUserController {

  private final UserService userService;

  public SystemUserController(final UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(
      value = "/user",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public LoginResponse getUser(final Authentication authentication) {
    return userService.createLoginResponse(authentication);
  }

  @RequestMapping(value = "/otp/send", method = RequestMethod.POST)
  public ResponseEntity<String> sendOtpToEmail(@RequestBody EmailDto emailDto) {
    return userService.serveOtpForForgetPassword(emailDto.getEmail());
  }

  @RequestMapping(value = "/otp/verify", method = RequestMethod.POST)
  public ResponseEntity<String> verifyOtp(@RequestBody OtpDto otpDto) {
    return userService.verifyOtp(otpDto.getEmail(), otpDto.getOtpCode());
  }

  @RequestMapping(value = "/reset/password", method = RequestMethod.POST)
  public ResponseEntity<String> resetPassword(
      @RequestBody PasswordDto passwordDto) {
    return userService.resetPassword(passwordDto.getEmail(), passwordDto);
  }

  @GetMapping("/status")
  public Health getStatus() {
    return Health.up().build();
  }

  @Data
  private static class EmailDto {
    String email;
  }

  @Data
  private static class OtpDto {
    String email;
    Integer otpCode;
  }
}
