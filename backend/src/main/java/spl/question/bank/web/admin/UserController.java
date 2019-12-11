package spl.question.bank.web.admin;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.database.model.Role;
import spl.question.bank.model.admin.UserDto;
import spl.question.bank.model.admin.UserInfo;
import spl.question.bank.service.UserService;

import java.security.SecureRandom;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class UserController {

  private final UserService userService;

  public UserController(final UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(
      value = "/user",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void create(final @RequestBody UserDto userDto) {
    logger.info("User = {}", userDto.toString());
    userService.saveUser(userDto);
  }

  @RequestMapping(
      value = "/user",
      method = RequestMethod.PUT,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void update(final @RequestBody UserDto userDto) {
    logger.info("User for update = {}", userDto.toString());
    userService.updateUser(userDto);
  }

  @RequestMapping(
      value = "/user/{id}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public UserDto getUser(final @PathVariable Integer id) {
    return userService.getUserById(id);
  }

  @RequestMapping(
      value = "/user/disable/{id}",
      method = RequestMethod.PUT,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<String> disable(@PathVariable Integer id) {
    return userService.disableUser(id);
  }

  @RequestMapping(
      value = "/users",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<UserInfo> getUsers() {
    return userService.getUsersInfo();
  }

  @RequestMapping(
      value = "/generate-password",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String generatePassword() {
    return RandomStringUtils.randomAlphanumeric((int) (Math.random() * 4 + 8));
  }

  @RequestMapping(
      value = "/roles",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<Role> getRoles() {
    return userService.getAllRoles();
  }

  @RequestMapping(value = "/moderator/{action}/{id}", method = RequestMethod.POST)
  public ResponseEntity<String> makeModerator(
      final @PathVariable("action") ActionType action, final @PathVariable("id") Integer id) {
    return userService.addRemoveModerator(action, id);
  }

  public enum ActionType {
    add,
    remove
  }
}
