package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import spl.question.bank.database.client.TeacherSubjectMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.client.UserProfileImageMapper;
import spl.question.bank.database.model.*;
import spl.question.bank.model.teacher.PasswordDto;
import spl.question.bank.model.teacher.TeacherDto;
import spl.question.bank.web.teacher.HeadmasterController;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;
import static spl.question.bank.web.teacher.HeadmasterController.TeacherListType.PENDING;

@Slf4j
@Service
public class TeacherService {
  private final List<String> ACCEPTED_FORMAT = Arrays.asList("image/jpeg", "image/png");
  private final UserMapper userMapper;
  private final BCryptPasswordEncoder encoder;
  private final TeacherSubjectMapper teacherSubjectMapper;
  private final UserProfileImageMapper userProfileImageMapper;

  public TeacherService(
      final UserMapper userMapper,
      final BCryptPasswordEncoder encoder,
      final TeacherSubjectMapper teacherSubjectMapper,
      final UserProfileImageMapper userProfileImageMapper) {
    this.userMapper = userMapper;
    this.encoder = encoder;
    this.teacherSubjectMapper = teacherSubjectMapper;
    this.userProfileImageMapper = userProfileImageMapper;
  }

  public List<TeacherDto> getTeachersList(
      final Integer eiinNumber, final HeadmasterController.TeacherListType listType) {
    val example = new UserExample();
    example.createCriteria().andEiinNumberEqualTo(eiinNumber).andEnabledEqualTo(true);
    val allUsers = userMapper.selectByExample(example);

    return allUsers.stream()
        .filter(
            user -> {
              val teacherSubjectExample = new TeacherSubjectExample();
              teacherSubjectExample.createCriteria().andTeacherIdEqualTo(user.getId());
              long count = teacherSubjectMapper.countByExample(teacherSubjectExample);

              if (listType.equals(PENDING)) return count <= 0;
              else return count > 0;
            })
        .map(
            user ->
                new TeacherDto()
                    .setId(user.getId())
                    .setEmail(user.getEmail())
                    .setFullName(user.getFirstName() + " " + user.getLastName()))
        .collect(toList());
  }

  public boolean allocateSubjects(final TeacherSubject teacherSubject) {
    val ex = new TeacherSubjectExample();
    ex.createCriteria()
        .andTeacherIdEqualTo(teacherSubject.getTeacherId())
        .andSubjectIdEqualTo(teacherSubject.getSubjectId());
    if (teacherSubjectMapper.countByExample(ex) > 0) {
      return false;
    }
    teacherSubjectMapper.insert(teacherSubject);
    return true;
  }

  public void unallocateSubject(Integer teacherId, Integer subjectId) {
    val teacherSubjectEx = new TeacherSubjectExample();
    teacherSubjectEx.createCriteria().andTeacherIdEqualTo(teacherId).andSubjectIdEqualTo(subjectId);
    teacherSubjectMapper.deleteByExample(teacherSubjectEx);
  }

  public void removeAllAllocation(Integer teacherId) {
    val ex = new TeacherSubjectExample();
    ex.createCriteria().andTeacherIdEqualTo(teacherId);
    teacherSubjectMapper.deleteByExample(ex);
  }

  public List<Integer> getAllocatedSubject(Integer teacherId) {
    val ex = new TeacherSubjectExample();
    ex.createCriteria().andTeacherIdEqualTo(teacherId);
    return teacherSubjectMapper.selectByExample(ex).stream()
        .map(TeacherSubject::getSubjectId)
        .collect(toList());
  }

  public ResponseEntity<String> saveProPic(Integer userId, MultipartFile profilePic)
      throws IOException {
    /*if (isNull(userService.getUserById(userId))) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id " + userId);
    }*/
    boolean isProPicSupported = checkImageFormat(profilePic);
    if (!isProPicSupported) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("File format not supported. Must provide jpg/png file.");
    }
    UserProfileImage profileImage = new UserProfileImage();
    profileImage.setUserId(userId);
    profileImage.setProfilePicture(profilePic.getBytes());
    val imgEx = new UserProfileImageExample();
    imgEx.createCriteria().andUserIdEqualTo(userId);
    val prevProfileImage = userProfileImageMapper.selectByExample(imgEx);
    if (!isNull(prevProfileImage)) {
      userProfileImageMapper.deleteByExample(imgEx);
    }
    userProfileImageMapper.insert(profileImage);
    return ResponseEntity.ok("Profile picture updated successfully.");
  }

  private boolean checkImageFormat(MultipartFile file) {
    try {
      if (!ACCEPTED_FORMAT.contains(file.getContentType())) {
        return false;
      } else {
        return true;
      }
    } catch (Exception e) {
      return false;
    }
  }

  public String getBase64ProPic(Integer userId) {
    val ex = new UserProfileImageExample();
    ex.createCriteria().andUserIdEqualTo(userId);
    val data = userProfileImageMapper.selectByExampleWithBLOBs(ex);

    if (CollectionUtils.isEmpty(data)) {
      return "";
    } else {
      return isNull(data.get(0).getProfilePicture())
          ? ""
          : Base64.getEncoder().encodeToString(data.get(0).getProfilePicture());
    }
  }

  public ResponseEntity<String> changePassoword(PasswordDto passwordDto) {
    val user = userMapper.selectByPrimaryKey(passwordDto.getUserId());
    String oldPass = passwordDto.getOldPassword();

    if (!encoder.matches(oldPass, user.getPassword())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect old password.");
    }
    String newPass = passwordDto.getNewPassword();

    if (!newPass.equals(passwordDto.getConfPassword())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("New password and confirm password does not match.");
    }
    user.setPassword(encoder.encode(newPass));
    userMapper.updateByPrimaryKey(user);
    return ResponseEntity.ok("Password has changed successfully.");
  }
}
