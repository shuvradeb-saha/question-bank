package spl.question.bank.web.admin;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(value = "/user",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void create(@RequestBody UserDto userDto) {
    logger.info("User = {}", userDto.toString());
    userService.saveUser(userDto);
  }

  @RequestMapping(value = "/user",
      method = RequestMethod.PUT,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void update(@RequestBody UserDto userDto) {
    logger.info("User for update = {}", userDto.toString());
    userService.updateUser(userDto);
  }

  @RequestMapping(value = "/generate-password",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String generatePassword() {
    return RandomStringUtils
        .randomAlphanumeric((int) (Math.random() * 4 + 8));
  }
}
