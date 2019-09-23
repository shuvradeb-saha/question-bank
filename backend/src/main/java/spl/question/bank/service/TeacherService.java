package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.TeacherSubjectMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.model.TeacherSubject;
import spl.question.bank.database.model.TeacherSubjectExample;
import spl.question.bank.database.model.User;
import spl.question.bank.database.model.UserExample;
import spl.question.bank.model.teacher.PendingTeacher;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class TeacherService {

    private final UserMapper userMapper;
    private final TeacherSubjectMapper teacherSubjectMapper;

    public TeacherService(final UserMapper userMapper,
                          final TeacherSubjectMapper teacherSubjectMapper) {
        this.userMapper = userMapper;
        this.teacherSubjectMapper = teacherSubjectMapper;
    }

    public List<PendingTeacher> getUnallocatedTeachers(final Integer eiinNumber) {
        val example = new UserExample();
        example.createCriteria().andEiinNumberEqualTo(eiinNumber);
        val allUsers = userMapper.selectByExample(example);

        return allUsers.stream()
                .filter(user -> {
                    val teacherSubjectExample = new TeacherSubjectExample();
                    teacherSubjectExample.createCriteria().andTeacherIdEqualTo(user.getId());
                    return teacherSubjectMapper.countByExample(teacherSubjectExample) > 0;
                }).map(user -> new PendingTeacher()
                        .setId(user.getId())
                        .setEmail(user.getEmail())
                        .setFullName(user.getFirstName() + " " + user.getLastName()))
                .collect(toList());
    }

    public void allocateSubjects(Integer teacherId, Integer subjectId) {
        val teacherSubject = new TeacherSubject();
        teacherSubject.setSubjectId(subjectId);
        teacherSubject.setTeacherId(teacherId);
        teacherSubjectMapper.insert(teacherSubject);
    }
}
