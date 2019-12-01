package spl.question.bank.database.client;

import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import org.apache.ibatis.type.JdbcType;
import spl.question.bank.database.MapperMarker;
import spl.question.bank.database.model.UserProfileImage;
import spl.question.bank.database.model.UserProfileImageExample;

public interface UserProfileImageMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @SelectProvider(type=UserProfileImageSqlProvider.class, method="countByExample")
    long countByExample(UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @DeleteProvider(type=UserProfileImageSqlProvider.class, method="deleteByExample")
    int deleteByExample(UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Delete({
        "delete from user_profile_image",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Insert({
        "insert into user_profile_image (user_id, profile_picture)",
        "values (#{userId,jdbcType=INTEGER}, #{profilePicture,jdbcType=BINARY})"
    })
    @SelectKey(statement="select currval('user_profile_image_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(UserProfileImage record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @InsertProvider(type=UserProfileImageSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('user_profile_image_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(UserProfileImage record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @SelectProvider(type=UserProfileImageSqlProvider.class, method="selectByExampleWithBLOBs")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="user_id", property="userId", jdbcType=JdbcType.INTEGER),
        @Result(column="profile_picture", property="profilePicture", jdbcType=JdbcType.BINARY)
    })
    List<UserProfileImage> selectByExampleWithBLOBs(UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @SelectProvider(type=UserProfileImageSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="user_id", property="userId", jdbcType=JdbcType.INTEGER)
    })
    List<UserProfileImage> selectByExample(UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Select({
        "select",
        "id, user_id, profile_picture",
        "from user_profile_image",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="user_id", property="userId", jdbcType=JdbcType.INTEGER),
        @Result(column="profile_picture", property="profilePicture", jdbcType=JdbcType.BINARY)
    })
    UserProfileImage selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=UserProfileImageSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") UserProfileImage record, @Param("example") UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=UserProfileImageSqlProvider.class, method="updateByExampleWithBLOBs")
    int updateByExampleWithBLOBs(@Param("record") UserProfileImage record, @Param("example") UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=UserProfileImageSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") UserProfileImage record, @Param("example") UserProfileImageExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=UserProfileImageSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(UserProfileImage record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Update({
        "update user_profile_image",
        "set user_id = #{userId,jdbcType=INTEGER},",
          "profile_picture = #{profilePicture,jdbcType=BINARY}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKeyWithBLOBs(UserProfileImage record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_profile_image
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Update({
        "update user_profile_image",
        "set user_id = #{userId,jdbcType=INTEGER}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(UserProfileImage record);
}