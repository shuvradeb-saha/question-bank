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
import spl.question.bank.database.model.OTP;
import spl.question.bank.database.model.OTPExample;

public interface OTPMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @SelectProvider(type=OTPSqlProvider.class, method="countByExample")
    long countByExample(OTPExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @DeleteProvider(type=OTPSqlProvider.class, method="deleteByExample")
    int deleteByExample(OTPExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @Delete({
        "delete from otp",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @Insert({
        "insert into otp (email, otp_code, ",
        "created_at, status)",
        "values (#{email,jdbcType=VARCHAR}, #{otpCode,jdbcType=INTEGER}, ",
        "#{createdAt,jdbcType=TIMESTAMP}, #{status,jdbcType=BIT})"
    })
    @SelectKey(statement="select currval('otp_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(OTP record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @InsertProvider(type=OTPSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('otp_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(OTP record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @SelectProvider(type=OTPSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="email", property="email", jdbcType=JdbcType.VARCHAR),
        @Result(column="otp_code", property="otpCode", jdbcType=JdbcType.INTEGER),
        @Result(column="created_at", property="createdAt", jdbcType=JdbcType.TIMESTAMP),
        @Result(column="status", property="status", jdbcType=JdbcType.BIT)
    })
    List<OTP> selectByExample(OTPExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @Select({
        "select",
        "id, email, otp_code, created_at, status",
        "from otp",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="email", property="email", jdbcType=JdbcType.VARCHAR),
        @Result(column="otp_code", property="otpCode", jdbcType=JdbcType.INTEGER),
        @Result(column="created_at", property="createdAt", jdbcType=JdbcType.TIMESTAMP),
        @Result(column="status", property="status", jdbcType=JdbcType.BIT)
    })
    OTP selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @UpdateProvider(type=OTPSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") OTP record, @Param("example") OTPExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @UpdateProvider(type=OTPSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") OTP record, @Param("example") OTPExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @UpdateProvider(type=OTPSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(OTP record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table otp
     *
     * @mbg.generated Thu Dec 12 23:05:49 BDT 2019
     */
    @Update({
        "update otp",
        "set email = #{email,jdbcType=VARCHAR},",
          "otp_code = #{otpCode,jdbcType=INTEGER},",
          "created_at = #{createdAt,jdbcType=TIMESTAMP},",
          "status = #{status,jdbcType=BIT}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(OTP record);
}