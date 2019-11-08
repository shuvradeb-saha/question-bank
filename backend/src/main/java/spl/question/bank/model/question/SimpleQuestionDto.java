package spl.question.bank.model.question;

import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.model.question.mcq.MCQType;

@Data
@Accessors(chain = true)
public class SimpleQuestionDto {

  private Integer id;
  private String partialContent;
  private Integer subjectId;
  private Integer classId;
  private Integer chapterId;
  private String mcqType;
}
