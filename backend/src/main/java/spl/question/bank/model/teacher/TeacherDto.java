package spl.question.bank.model.teacher;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class TeacherDto {
    private Integer id;
    private String fullName;
    private String email;
}
