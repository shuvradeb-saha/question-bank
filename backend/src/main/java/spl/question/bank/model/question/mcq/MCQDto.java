package spl.question.bank.model.question.mcq;


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

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
  int getCreatedBy();
  int getSubjectId();
  int getChapterId();
  Date getCreatedAt();
  int getApprovedBy();
  Date getApprovedAt();
  String getStatus();
}
