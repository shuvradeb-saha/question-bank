package spl.question.bank.model.question.mcq;


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import spl.question.bank.model.question.Difficulty;

import java.util.Date;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "mcqType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = StemBasedMCQDto.class, name = "STEM"),
    @JsonSubTypes.Type(value = PolynomialMCQDto.class, name = "POLYNOMIAL"),
    @JsonSubTypes.Type(value = GeneralMCQDto.class, name = "GENERAL")
})
public interface MCQDto {

  MCQType getMcqType();
  Integer getId();
  int getWeight();
  Integer getCreatedBy();
  Integer getSubjectId();
  Integer getChapterId();
  Date getCreatedAt();
  Integer getModeratedBy();
  Date getModeratedAt();
  String getStatus();
  Difficulty getDifficulty();
}
