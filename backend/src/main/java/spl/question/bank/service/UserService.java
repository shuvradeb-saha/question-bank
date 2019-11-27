package spl.question.bank.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.lang.Collections;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import lombok.var;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spl.question.bank.database.client.*;
import spl.question.bank.database.model.*;
import spl.question.bank.model.admin.Roles;
import spl.question.bank.model.admin.UserDto;
import spl.question.bank.model.admin.UserInfo;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.security.JwtConfig;
import spl.question.bank.web.admin.UserController.ActionType;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
@Slf4j
public class UserService {

  private final UserMapper userMapper;
  private final UserRoleMapper userRoleMapper;
  private final RoleMapper roleMapper;
  private final InstituteMapper instituteMapper;
  private final JwtConfig jwtConfig;
  private final BCryptPasswordEncoder encoder;
  private final MailService mailService;
  private final TeacherService teacherService;
  private final TeacherSubjectMapper teacherSubjectMapper;

  public UserService(
      final UserMapper userMapper,
      final UserRoleMapper userRoleMapper,
      final RoleMapper roleMapper,
      final InstituteMapper instituteMapper,
      final JwtConfig jwtConfig,
      final BCryptPasswordEncoder encoder,
      final MailService mailService,
      final TeacherService teacherService,
      final TeacherSubjectMapper teacherSubjectMapper) {
    this.userMapper = userMapper;
    this.userRoleMapper = userRoleMapper;
    this.roleMapper = roleMapper;
    this.instituteMapper = instituteMapper;
    this.jwtConfig = jwtConfig;
    this.encoder = encoder;
    this.mailService = mailService;
    this.teacherService = teacherService;
    this.teacherSubjectMapper = teacherSubjectMapper;
  }

  @Transactional
  public void saveUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();

    validateUser(user);
    user.setEnabled(true);
    user.setPassword(encoder.encode(user.getPassword()));
    if (userMapper.insert(user) < 0) {
      throw new RuntimeException("Cannot insert user data");
    }
    // assign role then
    final Integer id = user.getId();
    assignRole(id, roles);
    // if everything is done send the password to the email
    boolean isMailSucceed =
        mailService.sendMailWithCredentials(
            user.getEmail(), user.getFirstName(), user.getPassword());

    if (!isMailSucceed) {
      // delete the new user
      deleteRolesById(id);
      userMapper.deleteByPrimaryKey(id);
      throw new RuntimeException("Unable to insert new user for technical problem.");
    }
  }

  @Transactional
  public void updateUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();

    val oldInfo = userMapper.selectByPrimaryKey(user.getId());
    user.setPassword(oldInfo.getPassword());
    validateUser(user);
    if (user.getId() != null) {
      userMapper.updateByPrimaryKey(user);
      updateRole(user.getId(), roles);
    } else {
      throw new RuntimeException("Unable to update user");
    }
  }

  private void updateRole(Integer userId, List<Role> updatedRoles) {
    deleteRolesById(userId);
    assignRole(userId, updatedRoles);
  }

  private void deleteRolesById(Integer userId) {
    val example = new UserRoleExample();
    example.createCriteria().andUserIdEqualTo(userId);
    // delete previous roles
    userRoleMapper.deleteByExample(example);
  }

  private void assignRole(Integer userId, List<Role> roles) {
    roles.forEach(
        role -> {
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

    if (isBlank(user.getEmail())
        || isBlank(user.getFirstName())
        || isBlank(user.getLastName())
        || isBlank(user.getPassword())
        || isBlank(user.getPermanentAddress())
        || user.getBirthDate() == null
        || user.getJoinDate() == null) {
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
    ex.createCriteria().andEmailEqualTo(email).andEnabledEqualTo(true);

    val users = userMapper.selectByExample(ex);
    if (users == null || users.size() == 0) {
      throw new UsernameNotFoundException("No user found with the email " + email);
    }
    // As email is unique only one user will be retrieved at a time
    return users.get(0);
  }

  public List<String> getRolesByUser(Integer userId) {
    UserRoleExample ex = new UserRoleExample();
    ex.createCriteria().andUserIdEqualTo(userId);
    val roles = userRoleMapper.selectByExample(ex);
    return roles.stream()
        .map(UserRole::getRoleId)
        .map(roleId -> roleMapper.selectByPrimaryKey(roleId).getName())
        .collect(toList());
  }

  public LoginResponse createLoginResponse(final Authentication auth) {
    val token = getToken(auth);
    val user = getUserByEmail(auth.getName());
    user.setPassword("");
    val id = user.getId();
    val roles = getRolesByUser(id);
    val allocatedSubjects = teacherService.getAllocatedSubject(id);

    var loginResponse = new LoginResponse();
    loginResponse
        .setUser(user)
        .setRoles(roles)
        .setAllocatedSubjects(allocatedSubjects)
        .setToken(token);
    return loginResponse;
  }

  private String getToken(Authentication auth) {
    long now = System.currentTimeMillis();
    return Jwts.builder()
        .setSubject(auth.getName())
        .claim(
            "authorities",
            auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(toList()))
        .setIssuedAt(new Date(now))
        .setExpiration(new Date(now + jwtConfig.getExpiration() * 1000)) // in milliseconds
        .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
        .compact();
  }

  public User getAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return getUserByEmail((String) authentication.getPrincipal());
  }

  public List<Role> getAllRoles() {
    val roles = roleMapper.selectByExample(null);
    if (Collections.isEmpty(roles)) {
      throw new RuntimeException("No role available in Db");
    }
    return roles;
  }

  public List<UserInfo> getUsersInfo() {
    val ex = new UserExample();
    val users = userMapper.selectByExample(null);

    val eiinInstituteMap =
        getInstituteEiinMap(users.stream().map(User::getEiinNumber).collect(Collectors.toSet()));

    return users.stream()
        .filter(user -> !getRolesByUser(user.getId()).contains("ADMIN"))
        .map(
            user ->
                new UserInfo()
                    .setId(user.getId())
                    .setName(String.format("%s %s", user.getFirstName(), user.getLastName()))
                    .setEiinNumber(user.getEiinNumber())
                    .setRoles(getRolesByUser(user.getId()))
                    .setInstituteName(eiinInstituteMap.get(user.getEiinNumber()))
                    .setEmail(user.getEmail()))
        .collect(toList());
  }

  private Map<Integer, String> getInstituteEiinMap(Set<Integer> eiinNumbers) {
    val example = new InstituteExample();
    example.createCriteria().andEiinNumberIn(new ArrayList<>(eiinNumbers));
    val institutes = instituteMapper.selectByExample(example);

    return institutes.stream().collect(toMap(Institute::getEiinNumber, this::getInstituteName));
  }

  private String getInstituteName(Institute o) {
    val example = new InstituteExample();
    example.createCriteria().andEiinNumberEqualTo(o.getEiinNumber());
    return instituteMapper.selectByExample(example).get(0).getName();
  }

  public UserDto getUserById(Integer id) {
    val user = userMapper.selectByPrimaryKey(id);
    user.setPassword("");
    return new UserDto().setUser(user).setRoles(getRolesById(id));
  }

  private List<Role> getRolesById(Integer id) {
    UserRoleExample ex = new UserRoleExample();
    ex.createCriteria().andUserIdEqualTo(id);
    val roles = userRoleMapper.selectByExample(ex);
    return roles.stream()
        .map(UserRole::getRoleId)
        .map(roleMapper::selectByPrimaryKey)
        .collect(toList());
  }

  public boolean addRemoveModerator(ActionType action, Integer id) {
    // if no allocation return false
    if (teacherService.getAllocatedSubject(id).size() <= 0) {
      return false;
    }
    val moderatorRoleId = Roles.MODERATOR.getValue();
    if (action.equals(ActionType.add)) {
      UserRole userRole = new UserRole();
      userRole.setRoleId(moderatorRoleId);
      userRole.setUserId(id);
      userRoleMapper.insert(userRole);
    } else {
      UserRoleExample ex = new UserRoleExample();
      ex.createCriteria().andUserIdEqualTo(id).andRoleIdEqualTo(moderatorRoleId);
      userRoleMapper.deleteByExample(ex);
    }
    return true;
  }

  public List<User> getModeratorBySubject(Integer subjectId) {
    val allUsers = userMapper.selectByExample(null);
    val allUserRole = userRoleMapper.selectByExample(null);

    return allUsers.stream()
        .filter(user -> isModeratorOfSubject(user.getId(), allUserRole, subjectId))
        .collect(toList());
  }

  private boolean isModeratorOfSubject(
      Integer userId, List<UserRole> allUserRole, Integer subjectId) {

    for (UserRole userRole : allUserRole) {
      if (userRole.getUserId().equals(userId)
          && userRole.getRoleId().equals(Roles.MODERATOR.getValue())) {
        return teacherService.getAllocatedSubject(userId).contains(subjectId);
      }
    }
    return false;
  }

  public boolean checkTeacherSubject(Integer teacherId, Integer subjectId) {
    val ex = new TeacherSubjectExample();
    ex.createCriteria().andTeacherIdEqualTo(teacherId).andSubjectIdEqualTo(subjectId);
    return teacherSubjectMapper.countByExample(ex) > 0;
  }

  public User getRandomModerator(Integer subjectId, Integer creator) {
    val allModerators = getModeratorBySubject(subjectId);
    // Remove the creator if he is a moderator
    val refinedModerators =
        allModerators.stream()
            .filter(user -> !user.getId().equals(creator))
            .collect(Collectors.toList());

    if (refinedModerators.size() <= 0) {
      throw new RuntimeException("No moderator exists yet. Please submit question later.");
    }

    int randIndx = new Random().nextInt(refinedModerators.size());
    return refinedModerators.get(randIndx);
  }
}
