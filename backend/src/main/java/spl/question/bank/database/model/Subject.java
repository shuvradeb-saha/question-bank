package spl.question.bank.database.model;

import java.io.Serializable;

public class Subject implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column subject.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column subject.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private String name;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column subject.subject_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer subjectCode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column subject.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer classId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column subject.id
     *
     * @return the value of subject.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column subject.id
     *
     * @param id the value for subject.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column subject.name
     *
     * @return the value of subject.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column subject.name
     *
     * @param name the value for subject.name
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column subject.subject_code
     *
     * @return the value of subject.subject_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getSubjectCode() {
        return subjectCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column subject.subject_code
     *
     * @param subjectCode the value for subject.subject_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setSubjectCode(Integer subjectCode) {
        this.subjectCode = subjectCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column subject.class_id
     *
     * @return the value of subject.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getClassId() {
        return classId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column subject.class_id
     *
     * @param classId the value for subject.class_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
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
        Subject other = (Subject) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getSubjectCode() == null ? other.getSubjectCode() == null : this.getSubjectCode().equals(other.getSubjectCode()))
            && (this.getClassId() == null ? other.getClassId() == null : this.getClassId().equals(other.getClassId()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getSubjectCode() == null) ? 0 : getSubjectCode().hashCode());
        result = prime * result + ((getClassId() == null) ? 0 : getClassId().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
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
        sb.append(", subjectCode=").append(subjectCode);
        sb.append(", classId=").append(classId);
        sb.append("]");
        return sb.toString();
    }
}