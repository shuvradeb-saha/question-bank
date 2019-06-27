package spl.question.bank.service;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spl.question.bank.database.client.RoleMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.client.UserRoleMapper;
import spl.question.bank.database.model.User;
import spl.question.bank.database.model.UserExample;
import spl.question.bank.database.model.UserRole;
import spl.question.bank.database.model.UserRoleExample;
import spl.question.bank.model.UserDto;

@Service
@Slf4j
public class UserService {

  private final UserMapper userMapper;
  private final UserRoleMapper userRoleMapper;
  private final RoleMapper roleMapper;

  public UserService(final UserMapper userMapper,
      final UserRoleMapper userRoleMapper,
      final RoleMapper roleMapper) {
    this.userMapper = userMapper;
    this.userRoleMapper = userRoleMapper;
    this.roleMapper = roleMapper;
  }

  @Transactional
  public void saveUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoleIds();

    validateUser(user);

    if (user.getId() != null) {
      userMapper.updateByPrimaryKey(user);
    } else if (userMapper.insert(user) < 0) {
      throw new RuntimeException("Cannot insert data");
    }
    //assign role then
    roles.forEach(role -> {
      val userRole = new UserRole();
      userRole.setRoleId(role.getId());
      userRole.setUserId(user.getId());
      userRoleMapper.insert(userRole);
    });
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

  public User getUserByEmail(String email) {
    UserExample ex = new UserExample();
    ex.createCriteria().andEmailEqualTo(email);

    val users = userMapper.selectByExample(ex);

    if (users == null) {
      throw new UsernameNotFoundException("No user found with the email " + email);
    }
    //As email is unique only one user will be retrieved at atime
    return users.get(0);
  }

  public List<String> getRolesByUser(Integer userId) {
    UserRoleExample ex = new UserRoleExample();
    ex.createCriteria().andUserIdEqualTo(userId);

    val roles = userRoleMapper.selectByExample(ex);

    return roles
        .stream()
        .map(UserRole::getRoleId)
        .map(roleId -> roleMapper
            .selectByPrimaryKey(roleId)
            .getName())
        .collect(toList());
  }
}
