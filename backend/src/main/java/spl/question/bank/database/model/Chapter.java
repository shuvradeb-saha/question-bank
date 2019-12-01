package spl.question.bank.database.model;

import java.io.Serializable;

public class Chapter implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column chapter.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column chapter.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private String name;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column chapter.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer classId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column chapter.subject_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer subjectId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table chapter
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column chapter.id
     *
     * @return the value of chapter.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column chapter.id
     *
     * @param id the value for chapter.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column chapter.name
     *
     * @return the value of chapter.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column chapter.name
     *
     * @param name the value for chapter.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column chapter.class_id
     *
     * @return the value of chapter.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getClassId() {
        return classId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column chapter.class_id
     *
     * @param classId the value for chapter.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column chapter.subject_id
     *
     * @return the value of chapter.subject_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getSubjectId() {
        return subjectId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column chapter.subject_id
     *
     * @param subjectId the value for chapter.subject_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
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
        Chapter other = (Chapter) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getClassId() == null ? other.getClassId() == null : this.getClassId().equals(other.getClassId()))
            && (this.getSubjectId() == null ? other.getSubjectId() == null : this.getSubjectId().equals(other.getSubjectId()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getClassId() == null) ? 0 : getClassId().hashCode());
        result = prime * result + ((getSubjectId() == null) ? 0 : getSubjectId().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", classId=").append(classId);
        sb.append(", subjectId=").append(subjectId);
        sb.append("]");
        return sb.toString();
    }
}