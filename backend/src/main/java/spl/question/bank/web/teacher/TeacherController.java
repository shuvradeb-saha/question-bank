package spl.question.bank.web.teacher;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.model.User;
import spl.question.bank.model.teacher.PendingTeacher;
import spl.question.bank.service.TeacherService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Slf4j
@RequestMapping("/api/headmaster")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(final TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @RequestMapping(value = "/pending-teacher-list/{eiin}",
            method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
    public List<PendingTeacher> getPendingTeachers(final @PathVariable("eiin") Integer eiinNumber) {
        return teacherService.getUnallocatedTeachers(eiinNumber);
    }


    @RequestMapping(value = "/allocate-subject/{teacherId}/{subjectId}",
            method = POST, produces = APPLICATION_JSON_UTF8_VALUE)
    public void allocateSubjects(final @PathVariable("teacherId") Integer teacherId,
                                 final @PathVariable("subjectId") Integer subjectId) {
         teacherService.allocateSubjects(teacherId, subjectId);
    }
}
