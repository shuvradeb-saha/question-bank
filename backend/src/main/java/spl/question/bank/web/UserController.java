package spl.question.bank.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import spl.question.bank.model.UserDto;
import spl.question.bank.service.UserService;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class UserController {

  private final UserService userService;

  public UserController(final UserService userService) {
    this.userService = userService;
  }

  @RequestMapping("/register")
  public String register(@RequestBody UserDto userDto) {
    logger.info("User = {}", userDto.toString());
    userService.saveUser(userDto);

    return "not secured";
  }
}
