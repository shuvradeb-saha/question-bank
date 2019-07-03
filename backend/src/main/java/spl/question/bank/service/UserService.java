package spl.question.bank.service;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isBlank;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import lombok.var;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spl.question.bank.database.client.RoleMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.client.UserRoleMapper;
import spl.question.bank.database.model.Role;
import spl.question.bank.database.model.User;
import spl.question.bank.database.model.UserExample;
import spl.question.bank.database.model.UserRole;
import spl.question.bank.database.model.UserRoleExample;
import spl.question.bank.model.UserDto;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.security.JwtConfig;

@Service
@Slf4j
public class UserService {

  private final UserMapper userMapper;
  private final UserRoleMapper userRoleMapper;
  private final RoleMapper roleMapper;
  private final JwtConfig jwtConfig;

  public UserService(final UserMapper userMapper,
      final UserRoleMapper userRoleMapper,
      final RoleMapper roleMapper,
      final JwtConfig jwtConfig) {
    this.userMapper = userMapper;
    this.userRoleMapper = userRoleMapper;
    this.roleMapper = roleMapper;
    this.jwtConfig = jwtConfig;
  }

  @Transactional
  public void saveUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();

    validateUser(user);

    if (userMapper.insert(user) < 0) {
      throw new RuntimeException("Cannot insert data");
    }
    //assign role then
    assignRole(user.getId(), roles);
  }

  @Transactional
  public void updateUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();

    validateUser(user);

    if (user.getId() != null) {
      userMapper.updateByPrimaryKey(user);
      updateRole(user.getId(), roles);
    } else {
      throw new RuntimeException("Unable to update user");
    }
  }

  private void updateRole(Integer userId, List<Role> updatedRoles) {
    val example = new UserRoleExample();
    example.createCriteria().andUserIdEqualTo(userId);
    //delete previous roles
    userRoleMapper.deleteByExample(example);
    assignRole(userId, updatedRoles);
  }

  private void assignRole(Integer userId, List<Role> roles) {
    roles.forEach(role -> {
      val userRole = new UserRole();
      userRole.setRoleId(role.getId());
      userRole.setUserId(userId);
      userRoleMapper.insert(userRole);
    });
  }

  private void validateUser(User user) {
    if (user.getId() == null && isEmailExist(user.getEmail())) {
      throw new RuntimeException("User already exists");
    }

    if (user.getEiinNumber() == null) {
      throw new IllegalArgumentException("Must have to enter EIIN number");
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

    if (users == null || users.size() == 0) {
      throw new UsernameNotFoundException("No user found with the email " + email);
    }
    //As email is unique only one user will be retrieved at a time
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


  public LoginResponse createLoginResponse(final Authentication auth) {
    val token = getToken(auth);
    val user = getUserByEmail(auth.getName());
    user.setPassword("");
    val roles = getRolesByUser(user.getId());

    var loginResponse = new LoginResponse();
    loginResponse
        .setUser(user)
        .setRoles(roles)
        .setToken(token);
    return loginResponse;
  }


  public String getToken(Authentication auth) {
    long now = System.currentTimeMillis();
    return Jwts.builder()
        .setSubject(auth.getName())
        .claim("authorities", auth.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .collect(toList()))
        .setIssuedAt(new Date(now))
        .setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))  // in milliseconds
        .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
        .compact();
  }

}
