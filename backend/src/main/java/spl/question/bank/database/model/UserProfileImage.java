package spl.question.bank.database.model;

import java.io.Serializable;
import java.util.Arrays;

public class UserProfileImage implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_profile_image.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_profile_image.user_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private Integer userId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_profile_image.profile_picture
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private byte[] profilePicture;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_profile_image.id
     *
     * @return the value of user_profile_image.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_profile_image.id
     *
     * @param id the value for user_profile_image.id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_profile_image.user_id
     *
     * @return the value of user_profile_image.user_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_profile_image.user_id
     *
     * @param userId the value for user_profile_image.user_id
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_profile_image.profile_picture
     *
     * @return the value of user_profile_image.profile_picture
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public byte[] getProfilePicture() {
        return profilePicture;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_profile_image.profile_picture
     *
     * @param profilePicture the value for user_profile_image.profile_picture
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
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
        UserProfileImage other = (UserProfileImage) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (Arrays.equals(this.getProfilePicture(), other.getProfilePicture()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + (Arrays.hashCode(getProfilePicture()));
        return result;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
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
        sb.append(", userId=").append(userId);
        sb.append(", profilePicture=").append(profilePicture);
        sb.append("]");
        return sb.toString();
    }
}