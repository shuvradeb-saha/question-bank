package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.database.model.TeacherSubject;
import spl.question.bank.model.admin.UserDto;
import spl.question.bank.model.teacher.TeacherDto;
import spl.question.bank.service.TeacherService;
import spl.question.bank.service.UserService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static spl.question.bank.web.teacher.TeacherController.SubjectActionType.ALLOCATE;
import static spl.question.bank.web.teacher.TeacherController.SubjectActionType.UNALLOCATE;
import static spl.question.bank.web.teacher.TeacherController.TeacherListType.APPROVED;
import static spl.question.bank.web.teacher.TeacherController.TeacherListType.PENDING;

@RestController
@Slf4j
@RequestMapping("/api/headmaster")
public class TeacherController {

    private final TeacherService teacherService;
    private final UserService userService;

    public TeacherController(final TeacherService teacherService, final UserService userService) {
        this.teacherService = teacherService;
        this.userService = userService;
    }

    @RequestMapping(value = "/teacher-list/{type}/{eiin}",
            method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
    public List<TeacherDto> getPendingTeachers(final @PathVariable("type") TeacherListType listType,
                                               final @PathVariable("eiin") Integer eiinNumber) {
        if (listType.equals(PENDING)) {
            return teacherService.getTeachersList(eiinNumber, PENDING);
        } else if (listType.equals(APPROVED)) {
            return teacherService.getTeachersList(eiinNumber, APPROVED);
        } else {
            throw new IllegalArgumentException("Must provide valid type");
        }
    }

    @RequestMapping(value = "/teacher-subject/{actionType}", method = POST)
    public void allocateSubjects(final @RequestBody TeacherSubject teacherSubject,
                                 final @PathVariable("actionType") SubjectActionType actionType) {
        if (actionType.equals(ALLOCATE)) {
            teacherService.allocateSubjects(teacherSubject);
        } else if (actionType.equals(UNALLOCATE)) {
            teacherService.unallocateSubject(teacherSubject.getTeacherId(), teacherSubject.getSubjectId());
        } else {
            throw new IllegalArgumentException("Must provide valid type");
        }
    }

    @GetMapping(value = "/teacher/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public UserDto getTeacherInfo(final @PathVariable("id") Integer id) {
        return userService.getUserById(id);
    }

    public enum TeacherListType {
        PENDING, APPROVED
    }

    public enum SubjectActionType {
        ALLOCATE, UNALLOCATE
    }

}
