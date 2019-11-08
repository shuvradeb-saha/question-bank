package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.TeacherSubjectMapper;
import spl.question.bank.database.client.UserMapper;
import spl.question.bank.database.model.TeacherSubject;
import spl.question.bank.database.model.TeacherSubjectExample;
import spl.question.bank.database.model.UserExample;
import spl.question.bank.model.teacher.TeacherDto;
import spl.question.bank.web.teacher.HeadmasterController;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static spl.question.bank.web.teacher.HeadmasterController.TeacherListType.PENDING;

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

    public List<TeacherDto> getTeachersList(final Integer eiinNumber,
                                            final HeadmasterController.TeacherListType listType) {
        val example = new UserExample();
        example.createCriteria().andEiinNumberEqualTo(eiinNumber);
        val allUsers = userMapper.selectByExample(example);

        return allUsers.stream()
                .filter(user -> {
                    val teacherSubjectExample = new TeacherSubjectExample();
                    teacherSubjectExample.createCriteria().andTeacherIdEqualTo(user.getId());
                    long count = teacherSubjectMapper.countByExample(teacherSubjectExample);

                    if (listType.equals(PENDING))
                        return count <= 0;
                    else return count > 0;
                }).map(user -> new TeacherDto()
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
        teacherSubjectEx
                .createCriteria()
                .andTeacherIdEqualTo(teacherId)
                .andSubjectIdEqualTo(subjectId);
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
        return teacherSubjectMapper
                .selectByExample(ex)
                .stream()
                .map(TeacherSubject::getSubjectId)
                .collect(toList());
    }
}
