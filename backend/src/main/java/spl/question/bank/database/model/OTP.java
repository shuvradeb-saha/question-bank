package spl.question.bank.database.model;

import java.io.Serializable;
import java.util.Date;

public class OTP implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column otp.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column otp.email
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private String email;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column otp.otp_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer otpCode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column otp.created_at
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Date createdAt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column otp.status
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Boolean status;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table otp
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column otp.id
     *
     * @return the value of otp.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column otp.id
     *
     * @param id the value for otp.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column otp.email
     *
     * @return the value of otp.email
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column otp.email
     *
     * @param email the value for otp.email
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column otp.otp_code
     *
     * @return the value of otp.otp_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getOtpCode() {
        return otpCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column otp.otp_code
     *
     * @param otpCode the value for otp.otp_code
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setOtpCode(Integer otpCode) {
        this.otpCode = otpCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column otp.created_at
     *
     * @return the value of otp.created_at
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column otp.created_at
     *
     * @param createdAt the value for otp.created_at
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column otp.status
     *
     * @return the value of otp.status
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Boolean getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column otp.status
     *
     * @param status the value for otp.status
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setStatus(Boolean status) {
        this.status = status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
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
        OTP other = (OTP) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getEmail() == null ? other.getEmail() == null : this.getEmail().equals(other.getEmail()))
            && (this.getOtpCode() == null ? other.getOtpCode() == null : this.getOtpCode().equals(other.getOtpCode()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getEmail() == null) ? 0 : getEmail().hashCode());
        result = prime * result + ((getOtpCode() == null) ? 0 : getOtpCode().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
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
        sb.append(", email=").append(email);
        sb.append(", otpCode=").append(otpCode);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", status=").append(status);
        sb.append("]");
        return sb.toString();
    }
}