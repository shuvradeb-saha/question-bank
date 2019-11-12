package spl.question.bank.model.question;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class DownloadCriteria {

  private Integer teacherId;
  private Integer classId;
  private Integer subjectId;
  private List<Integer> chapters;
  private String examType;
  private String questionType;
}
