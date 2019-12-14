package spl.question.bank.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.lang.Collections;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import lombok.var;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spl.question.bank.database.client.*;
import spl.question.bank.database.model.*;
import spl.question.bank.model.admin.UserDto;
import spl.question.bank.model.admin.UserInfo;
import spl.question.bank.model.login.LoginResponse;
import spl.question.bank.model.question.QuestionStatus;
import spl.question.bank.model.teacher.PasswordDto;
import spl.question.bank.security.JwtConfig;
import spl.question.bank.web.admin.UserController.ActionType;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.springframework.util.CollectionUtils.isEmpty;
import static spl.question.bank.model.admin.Roles.HEADMASTER;
import static spl.question.bank.model.admin.Roles.MODERATOR;

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
  private final OTPMapper otpMapper;
  private final CQQuestionMapper cqQuestionMapper;
  private final MCQQuestionMapper mcqQuestionMapper;

  public UserService(
      final UserMapper userMapper,
      final UserRoleMapper userRoleMapper,
      final RoleMapper roleMapper,
      final InstituteMapper instituteMapper,
      final JwtConfig jwtConfig,
      final BCryptPasswordEncoder encoder,
      final MailService mailService,
      final TeacherService teacherService,
      final TeacherSubjectMapper teacherSubjectMapper,
      final OTPMapper otpMapper,
      final CQQuestionMapper cqQuestionMapper,
      final MCQQuestionMapper mcqQuestionMapper) {
    this.userMapper = userMapper;
    this.userRoleMapper = userRoleMapper;
    this.roleMapper = roleMapper;
    this.instituteMapper = instituteMapper;
    this.jwtConfig = jwtConfig;
    this.encoder = encoder;
    this.mailService = mailService;
    this.teacherService = teacherService;
    this.teacherSubjectMapper = teacherSubjectMapper;
    this.otpMapper = otpMapper;
    this.cqQuestionMapper = cqQuestionMapper;
    this.mcqQuestionMapper = mcqQuestionMapper;
  }

  @Transactional
  public void saveUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();
    final String generatedPassword = user.getPassword();

    validateUser(user);
    val stringRoles = roleObjToString(roles);
    // check any headmaster has before
    if (stringRoles.contains(HEADMASTER.name()) && hasHeadmaster(userDto)) {
      throw new IllegalArgumentException("This institute already has a headmaster.");
    }

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
            user.getEmail(), user.getFirstName(), generatedPassword);

    if (!isMailSucceed) {
      // delete the new user
      deleteRolesById(id);
      userMapper.deleteByPrimaryKey(id);
      throw new RuntimeException("Unable to insert new user for technical problem.");
    }
  }

  private boolean hasHeadmaster(UserDto userDto) {
    val ex = new UserExample();
    ex.createCriteria()
        .andEiinNumberEqualTo(userDto.getUser().getEiinNumber())
        .andEnabledEqualTo(true);
    val allUsers = userMapper.selectByExample(ex);

    for (User u : allUsers) {
      val rolesOfUsr = getRolesByUser(u.getId());
      if (rolesOfUsr.contains(HEADMASTER.name())) {
        return true;
      }
    }
    return false;
  }

  private List<String> roleObjToString(List<Role> roles) {
    return roles.stream().map(Role::getName).collect(toList());
  }

  @Transactional
  public void updateUser(final UserDto userDto) {
    val user = userDto.getUser();
    val roles = userDto.getRoles();

    val oldInfo = userMapper.selectByPrimaryKey(user.getId());
    val oldRoles = roleObjToString(getRolesById(oldInfo.getId()));
    val newRoles = roleObjToString(userDto.getRoles());

    if (oldRoles.contains(MODERATOR.name()) && !newRoles.contains(MODERATOR.name())) {
      throw new RuntimeException("Moderator role changing not possible from here.");
    }

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

  public ResponseEntity<String> disableUser(Integer id) {
    val userDetail = getUserById(id);
    val strRoles = roleObjToString(userDetail.getRoles());

    if (strRoles.contains(MODERATOR.name())) {
      val problems = sendPendingQuestionsToOther(id);
      if (!isEmpty(problems)) {
        String subjects = problems.stream().map(String::valueOf).collect(Collectors.joining(","));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Please insert at least one moderator to subjects with id " + subjects);
      }
      UserRoleExample ex = new UserRoleExample();
      ex.createCriteria().andUserIdEqualTo(id).andRoleIdEqualTo(MODERATOR.getValue());
      userRoleMapper.deleteByExample(ex);
    }
    val usr = userDetail.getUser();
    usr.setEnabled(false);
    userMapper.updateByPrimaryKey(usr);
    return ResponseEntity.ok("User successfully removed.");
  }

  private Set<Integer> sendPendingQuestionsToOther(Integer mId) {
    val mcqEx = new MCQQuestionExample();
    mcqEx
        .createCriteria()
        .andModeratedByEqualTo(mId)
        .andStatusEqualTo(QuestionStatus.pending.name());
    val mcqs = mcqQuestionMapper.selectByExample(mcqEx);
    val cqEx = new CQQuestionExample();
    cqEx.createCriteria()
        .andModeratedByEqualTo(mId)
        .andStatusEqualTo(QuestionStatus.pending.name());
    val cqs = cqQuestionMapper.selectByExample(cqEx);

    if (isEmpty(mcqs) && isEmpty(cqs)) {
      return null;
    }
    val subjectSet = new HashSet<Integer>();
    mcqs.forEach(
        mcqQuestion -> {
          subjectSet.add(mcqQuestion.getSubjectId());
        });
    cqs.forEach(
        cqQuestion -> {
          subjectSet.add(cqQuestion.getSubjectId());
        });

    val problemSubject = new HashSet<Integer>();
    for (val sId : subjectSet) {
      if (getModeratorBySubject(sId).size() == 1) {
        problemSubject.add(sId);
      }
    }

    if (problemSubject.size() > 0) {
      return problemSubject;
    }

    mcqs.forEach(
        mcq -> {
          Integer moderatorId = getRandomModerator(mcq.getSubjectId(), mcq.getCreatedBy()).getId();
          mcq.setModeratedBy(moderatorId);
          mcqQuestionMapper.updateByPrimaryKey(mcq);
        });

    cqs.forEach(
        cq -> {
          Integer moderatorId = getRandomModerator(cq.getSubjectId(), cq.getCreatedBy()).getId();
          cq.setModeratedBy(moderatorId);
          cqQuestionMapper.updateByPrimaryKey(cq);
        });

    return null;
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
    val profilePic = teacherService.getBase64ProPic(id);
    var loginResponse = new LoginResponse();
    loginResponse
        .setUser(user)
        .setRoles(roles)
        .setAllocatedSubjects(allocatedSubjects)
        .setToken(token)
        .setProfilePic(profilePic);
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
                    .setEnabled(user.getEnabled())
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

  public ResponseEntity<String> addRemoveModerator(ActionType action, Integer id) {

    val moderatorRoleId = MODERATOR.getValue();
    if (action.equals(ActionType.add)) {
      if (teacherService.getAllocatedSubject(id).size() <= 0) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Unable to make moderator. This user does not have any allocated subject.");
      }

      UserRole userRole = new UserRole();
      userRole.setRoleId(moderatorRoleId);
      userRole.setUserId(id);
      userRoleMapper.insert(userRole);

      return ResponseEntity.ok("User added as moderator.");
    } else {
      MCQQuestionExample mcqEx = new MCQQuestionExample();
      mcqEx
          .createCriteria()
          .andModeratedByEqualTo(id)
          .andStatusEqualTo(QuestionStatus.pending.name());

      CQQuestionExample cqEx = new CQQuestionExample();
      cqEx.createCriteria()
          .andModeratedByEqualTo(id)
          .andStatusEqualTo(QuestionStatus.pending.name());

      boolean hasPendingQuestion =
          cqQuestionMapper.countByExample(cqEx) > 0 || mcqQuestionMapper.countByExample(mcqEx) > 0;

      if (hasPendingQuestion) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Unable to remove. The moderator has pending questions.");
      }

      UserRoleExample ex = new UserRoleExample();
      ex.createCriteria().andUserIdEqualTo(id).andRoleIdEqualTo(moderatorRoleId);
      userRoleMapper.deleteByExample(ex);
      return ResponseEntity.ok("Removed moderatorship from user.");
    }
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
          && userRole.getRoleId().equals(MODERATOR.getValue())) {
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

  public ResponseEntity<String> serveOtpForForgetPassword(String email) {
    val user = getUserByEmail(email);
    if (isNull(user)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found with such email.");
    }
    // deletePrevious false
    OTPExample ex = new OTPExample();
    ex.createCriteria().andEmailEqualTo(email);
    if (otpMapper.countByExample(ex) > 0) {
      otpMapper.deleteByExample(ex);
    }

    String otpCode = getRandomNumberString();
    OTP otp = new OTP();
    otp.setEmail(email);
    otp.setOtpCode(Integer.parseInt(otpCode));
    otp.setCreatedAt(new Date());
    otp.setStatus(false);
    otpMapper.insert(otp);
    mailService.sendMailWithOtp(otp.getEmail(), otp.getOtpCode());
    return ResponseEntity.ok("An Otp has sent to your email.");
  }

  private String getRandomNumberString() {
    SecureRandom rnd = new SecureRandom();
    int number = rnd.nextInt(999999);
    return String.format("%06d", number);
  }

  public ResponseEntity<String> verifyOtp(String email, Integer otpCode) {
    OTPExample ex = new OTPExample();
    ex.createCriteria().andEmailEqualTo(email).andOtpCodeEqualTo(otpCode).andStatusEqualTo(false);
    ex.setOrderByClause("created_at DESC");

    val items = otpMapper.selectByExample(ex);
    if (isEmpty(items)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(String.format("Otp with email %s does not match.", email));
    }
    OTP dbOtp = items.get(0);
    long createdTime = dbOtp.getCreatedAt().getTime();
    long threeMinAfter = createdTime + (3 * 60 * 1000);
    Date dateThreeMinAfter = new Date(threeMinAfter);
    Date now = new Date();
    logger.info(
        "Created at => {} three minute after => {} Now => {}",
        dbOtp.getCreatedAt(),
        dateThreeMinAfter,
        now);
    if (now.after(dateThreeMinAfter)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("Otp code you entered has expired.");
    } else {
      dbOtp.setStatus(true);
      otpMapper.updateByPrimaryKey(dbOtp);
      return ResponseEntity.status(HttpStatus.OK).body("Otp verification has succeeded!!");
    }
  }

  public ResponseEntity<String> resetPassword(String email, PasswordDto passwordDto) {
    if (!passwordDto.getNewPassword().equals(passwordDto.getConfPassword())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("New password and confirm password does not match.");
    }

    OTPExample example = new OTPExample();
    example.createCriteria().andEmailEqualTo(email).andStatusEqualTo(true);

    val items = otpMapper.selectByExample(example);
    if (isEmpty(items)) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("No verified otp found with email " + email);
    }
    val user = getUserByEmail(email);
    user.setPassword(encoder.encode(passwordDto.getNewPassword()));
    userMapper.updateByPrimaryKey(user);

    return ResponseEntity.status(HttpStatus.OK).body("Password reset completed!!");
  }
}
