package spl.question.bank.model.admin;

import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.database.model.Chapter;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class ChapterDto implements Serializable {
    Integer classId;
    Integer subjectId;
    String chapterName;
    Integer id;
    List<String> learningOutcome;
}
