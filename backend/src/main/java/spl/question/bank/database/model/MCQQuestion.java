package spl.question.bank.database.model;

import java.io.Serializable;
import java.util.Date;

public class MCQQuestion implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.type
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private String type;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.base_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private String baseQuestion;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.weight
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer weight;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.created_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer createdBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.subject_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer subjectId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.chapter_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer chapterId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.created_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Date createdAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.moderated_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Date moderatedAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.moderated_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private Integer moderatedBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.status
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private String status;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.difficulty
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private String difficulty;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column mcq_question.reject_cause
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private String rejectCause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table mcq_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.id
     *
     * @return the value of mcq_question.id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.id
     *
     * @param id the value for mcq_question.id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.type
     *
     * @return the value of mcq_question.type
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public String getType() {
        return type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.type
     *
     * @param type the value for mcq_question.type
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.base_question
     *
     * @return the value of mcq_question.base_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public String getBaseQuestion() {
        return baseQuestion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.base_question
     *
     * @param baseQuestion the value for mcq_question.base_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setBaseQuestion(String baseQuestion) {
        this.baseQuestion = baseQuestion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.weight
     *
     * @return the value of mcq_question.weight
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getWeight() {
        return weight;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.weight
     *
     * @param weight the value for mcq_question.weight
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.created_by
     *
     * @return the value of mcq_question.created_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.created_by
     *
     * @param createdBy the value for mcq_question.created_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.subject_id
     *
     * @return the value of mcq_question.subject_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getSubjectId() {
        return subjectId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.subject_id
     *
     * @param subjectId the value for mcq_question.subject_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.chapter_id
     *
     * @return the value of mcq_question.chapter_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getChapterId() {
        return chapterId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.chapter_id
     *
     * @param chapterId the value for mcq_question.chapter_id
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.created_at
     *
     * @return the value of mcq_question.created_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.created_at
     *
     * @param createdAt the value for mcq_question.created_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.moderated_at
     *
     * @return the value of mcq_question.moderated_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Date getModeratedAt() {
        return moderatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.moderated_at
     *
     * @param moderatedAt the value for mcq_question.moderated_at
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setModeratedAt(Date moderatedAt) {
        this.moderatedAt = moderatedAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.moderated_by
     *
     * @return the value of mcq_question.moderated_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public Integer getModeratedBy() {
        return moderatedBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.moderated_by
     *
     * @param moderatedBy the value for mcq_question.moderated_by
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setModeratedBy(Integer moderatedBy) {
        this.moderatedBy = moderatedBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.status
     *
     * @return the value of mcq_question.status
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public String getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.status
     *
     * @param status the value for mcq_question.status
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.difficulty
     *
     * @return the value of mcq_question.difficulty
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public String getDifficulty() {
        return difficulty;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.difficulty
     *
     * @param difficulty the value for mcq_question.difficulty
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column mcq_question.reject_cause
     *
     * @return the value of mcq_question.reject_cause
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public String getRejectCause() {
        return rejectCause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column mcq_question.reject_cause
     *
     * @param rejectCause the value for mcq_question.reject_cause
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    public void setRejectCause(String rejectCause) {
        this.rejectCause = rejectCause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table mcq_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        MCQQuestion other = (MCQQuestion) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getBaseQuestion() == null ? other.getBaseQuestion() == null : this.getBaseQuestion().equals(other.getBaseQuestion()))
            && (this.getWeight() == null ? other.getWeight() == null : this.getWeight().equals(other.getWeight()))
            && (this.getCreatedBy() == null ? other.getCreatedBy() == null : this.getCreatedBy().equals(other.getCreatedBy()))
            && (this.getSubjectId() == null ? other.getSubjectId() == null : this.getSubjectId().equals(other.getSubjectId()))
            && (this.getChapterId() == null ? other.getChapterId() == null : this.getChapterId().equals(other.getChapterId()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getModeratedAt() == null ? other.getModeratedAt() == null : this.getModeratedAt().equals(other.getModeratedAt()))
            && (this.getModeratedBy() == null ? other.getModeratedBy() == null : this.getModeratedBy().equals(other.getModeratedBy()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getDifficulty() == null ? other.getDifficulty() == null : this.getDifficulty().equals(other.getDifficulty()))
            && (this.getRejectCause() == null ? other.getRejectCause() == null : this.getRejectCause().equals(other.getRejectCause()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table mcq_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getBaseQuestion() == null) ? 0 : getBaseQuestion().hashCode());
        result = prime * result + ((getWeight() == null) ? 0 : getWeight().hashCode());
        result = prime * result + ((getCreatedBy() == null) ? 0 : getCreatedBy().hashCode());
        result = prime * result + ((getSubjectId() == null) ? 0 : getSubjectId().hashCode());
        result = prime * result + ((getChapterId() == null) ? 0 : getChapterId().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        result = prime * result + ((getModeratedAt() == null) ? 0 : getModeratedAt().hashCode());
        result = prime * result + ((getModeratedBy() == null) ? 0 : getModeratedBy().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getDifficulty() == null) ? 0 : getDifficulty().hashCode());
        result = prime * result + ((getRejectCause() == null) ? 0 : getRejectCause().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table mcq_question
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", type=").append(type);
        sb.append(", baseQuestion=").append(baseQuestion);
        sb.append(", weight=").append(weight);
        sb.append(", createdBy=").append(createdBy);
        sb.append(", subjectId=").append(subjectId);
        sb.append(", chapterId=").append(chapterId);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", moderatedAt=").append(moderatedAt);
        sb.append(", moderatedBy=").append(moderatedBy);
        sb.append(", status=").append(status);
        sb.append(", difficulty=").append(difficulty);
        sb.append(", rejectCause=").append(rejectCause);
        sb.append("]");
        return sb.toString();
    }
}