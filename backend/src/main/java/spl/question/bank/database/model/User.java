package spl.question.bank.database.model;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.id
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.email
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String email;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.password
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String password;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.first_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String firstName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.last_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String lastName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.permanent_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String permanentAddress;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.temp_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private String tempAddress;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.birth_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private Date birthDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.join_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private Date joinDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.eiin_number
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private Integer eiinNumber;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column users.enabled
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private Boolean enabled;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table users
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.id
     *
     * @return the value of users.id
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.id
     *
     * @param id the value for users.id
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.email
     *
     * @return the value of users.email
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.email
     *
     * @param email the value for users.email
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.password
     *
     * @return the value of users.password
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getPassword() {
        return password;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.password
     *
     * @param password the value for users.password
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.first_name
     *
     * @return the value of users.first_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.first_name
     *
     * @param firstName the value for users.first_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.last_name
     *
     * @return the value of users.last_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.last_name
     *
     * @param lastName the value for users.last_name
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.permanent_address
     *
     * @return the value of users.permanent_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getPermanentAddress() {
        return permanentAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.permanent_address
     *
     * @param permanentAddress the value for users.permanent_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setPermanentAddress(String permanentAddress) {
        this.permanentAddress = permanentAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.temp_address
     *
     * @return the value of users.temp_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public String getTempAddress() {
        return tempAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.temp_address
     *
     * @param tempAddress the value for users.temp_address
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setTempAddress(String tempAddress) {
        this.tempAddress = tempAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.birth_date
     *
     * @return the value of users.birth_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public Date getBirthDate() {
        return birthDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.birth_date
     *
     * @param birthDate the value for users.birth_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.join_date
     *
     * @return the value of users.join_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public Date getJoinDate() {
        return joinDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.join_date
     *
     * @param joinDate the value for users.join_date
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.eiin_number
     *
     * @return the value of users.eiin_number
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public Integer getEiinNumber() {
        return eiinNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.eiin_number
     *
     * @param eiinNumber the value for users.eiin_number
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setEiinNumber(Integer eiinNumber) {
        this.eiinNumber = eiinNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column users.enabled
     *
     * @return the value of users.enabled
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column users.enabled
     *
     * @param enabled the value for users.enabled
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table users
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
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
        User other = (User) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getEmail() == null ? other.getEmail() == null : this.getEmail().equals(other.getEmail()))
            && (this.getPassword() == null ? other.getPassword() == null : this.getPassword().equals(other.getPassword()))
            && (this.getFirstName() == null ? other.getFirstName() == null : this.getFirstName().equals(other.getFirstName()))
            && (this.getLastName() == null ? other.getLastName() == null : this.getLastName().equals(other.getLastName()))
            && (this.getPermanentAddress() == null ? other.getPermanentAddress() == null : this.getPermanentAddress().equals(other.getPermanentAddress()))
            && (this.getTempAddress() == null ? other.getTempAddress() == null : this.getTempAddress().equals(other.getTempAddress()))
            && (this.getBirthDate() == null ? other.getBirthDate() == null : this.getBirthDate().equals(other.getBirthDate()))
            && (this.getJoinDate() == null ? other.getJoinDate() == null : this.getJoinDate().equals(other.getJoinDate()))
            && (this.getEiinNumber() == null ? other.getEiinNumber() == null : this.getEiinNumber().equals(other.getEiinNumber()))
            && (this.getEnabled() == null ? other.getEnabled() == null : this.getEnabled().equals(other.getEnabled()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table users
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getEmail() == null) ? 0 : getEmail().hashCode());
        result = prime * result + ((getPassword() == null) ? 0 : getPassword().hashCode());
        result = prime * result + ((getFirstName() == null) ? 0 : getFirstName().hashCode());
        result = prime * result + ((getLastName() == null) ? 0 : getLastName().hashCode());
        result = prime * result + ((getPermanentAddress() == null) ? 0 : getPermanentAddress().hashCode());
        result = prime * result + ((getTempAddress() == null) ? 0 : getTempAddress().hashCode());
        result = prime * result + ((getBirthDate() == null) ? 0 : getBirthDate().hashCode());
        result = prime * result + ((getJoinDate() == null) ? 0 : getJoinDate().hashCode());
        result = prime * result + ((getEiinNumber() == null) ? 0 : getEiinNumber().hashCode());
        result = prime * result + ((getEnabled() == null) ? 0 : getEnabled().hashCode());
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table users
     *
     * @mbg.generated Wed Oct 16 23:42:42 BDT 2019
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", email=").append(email);
        sb.append(", password=").append(password);
        sb.append(", firstName=").append(firstName);
        sb.append(", lastName=").append(lastName);
        sb.append(", permanentAddress=").append(permanentAddress);
        sb.append(", tempAddress=").append(tempAddress);
        sb.append(", birthDate=").append(birthDate);
        sb.append(", joinDate=").append(joinDate);
        sb.append(", eiinNumber=").append(eiinNumber);
        sb.append(", enabled=").append(enabled);
        sb.append("]");
        return sb.toString();
    }
}