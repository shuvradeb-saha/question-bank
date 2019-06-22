package spl.question.bank.service;

import static org.apache.commons.lang3.StringUtils.isBlank;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.model.User;
import spl.question.bank.database.model.UserExample;

@Service
@Slf4j
public class UserService {

  private final UserMapper userMapper;

  public UserService(final UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  public void saveUser(final User user) {
    validateUser(user);
    if (user.getId() != null) {
      userMapper.updateByPrimaryKey(user);
    }
    if (userMapper.insert(user) < 0) {
      throw new RuntimeException("Cannot insert data");
    }
  }

  private void validateUser(User user) {
    if (user.getId() == null && isEmailExist(user.getEmail())) {
      throw new RuntimeException("User already exists");
    }

    if (isBlank(user.getEmail()) || isBlank(user.getFirstName()) ||
        isBlank(user.getLastName()) || isBlank(user.getPassword()) ||
        isBlank(user.getPermanentAddress()) || user.getBirthDate() == null ||
        user.getJoinDate() == null) {
      throw new IllegalArgumentException("Enter user information correctly");
    }
  }

  private boolean isEmailExist(String email) {
    UserExample ex = new UserExample();
    ex.createCriteria().andEmailEqualTo(email);

    return userMapper.selectByExample(ex).size() > 0;
  }

}
