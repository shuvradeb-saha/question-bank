package spl.question.bank.model.question.mcq;


import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;
import lombok.experimental.Accessors;
import spl.question.bank.model.question.Difficulty;

import java.util.Date;

@Data
@Accessors(chain = true)
public class StemBasedMCQDto implements MCQDto {

  private Integer id;
  private MCQType mcqType;
  private int weight;
  private Integer subjectId;
  private Integer chapterId;
  private Integer createdBy;
  private Integer moderatedBy;
  private String status;
  private Difficulty difficulty;
  private String rejectedCause;
  private Date createdAt;
  private Date moderatedAt;

  @JsonUnwrapped
  private StemBasedMCQDetail stemBasedMCQDetail;

  @Override
  public MCQType getMcqType() {
    return MCQType.STEM;
  }
}
