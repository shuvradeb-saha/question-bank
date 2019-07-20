package spl.question.bank.web.admin;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;
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
  private final SecureRandom secureRandom = new SecureRandom();

  public UserController(final UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(value = "/user",
      method = RequestMethod.POST,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void create(final @RequestBody UserDto userDto) {
    logger.info("User = {}", userDto.toString());
    userService.saveUser(userDto);
  }

  @RequestMapping(value = "/user",
      method = RequestMethod.PUT,
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void update(final @RequestBody UserDto userDto) {
    logger.info("User for update = {}", userDto.toString());
    userService.updateUser(userDto);
  }

  @RequestMapping(value = "/user/{id}",
          method = RequestMethod.GET,
          produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public UserDto getUser(final @PathVariable Integer id) {
    return userService.getUserById(id);
  }

  @RequestMapping(value = "/users",
          method = RequestMethod.GET,
          produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<UserInfo> getUsers() {
    return userService.getUsersInfo();
  }

  @RequestMapping(value = "/generate-password",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String generatePassword() {
    return RandomStringUtils
        .randomAlphanumeric((int) (Math.random() * 4 + 8));
  }

  @RequestMapping(value = "/roles",
          method = RequestMethod.GET,
          produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<Role> getRoles() {
    return userService.getAllRoles();
  }

/*
  //TODO => While implementing forgot password
  @RequestMapping(value = "/generate-password",
          method = RequestMethod.GET,
          produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String generatePassword() {
    ByteBuffer buffer = ByteBuffer.allocate(Long.BYTES);
    buffer.putLong(secureRandom.nextLong());
    byte[] encodedBytes = Base64.getEncoder().encode(buffer.array());
    return new String(encodedBytes);
  }
*/
}
