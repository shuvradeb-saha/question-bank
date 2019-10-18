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
import spl.question.bank.database.model.Subject;
import spl.question.bank.database.model.SubjectExample;

public interface SubjectMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @SelectProvider(type=SubjectSqlProvider.class, method="countByExample")
    long countByExample(SubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @DeleteProvider(type=SubjectSqlProvider.class, method="deleteByExample")
    int deleteByExample(SubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @Delete({
        "delete from subject",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @Insert({
        "insert into subject (name, subject_code, ",
        "class_id)",
        "values (#{name,jdbcType=VARCHAR}, #{subjectCode,jdbcType=INTEGER}, ",
        "#{classId,jdbcType=INTEGER})"
    })
    @SelectKey(statement="select currval('subject_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(Subject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @InsertProvider(type=SubjectSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('subject_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(Subject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @SelectProvider(type=SubjectSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR),
        @Result(column="subject_code", property="subjectCode", jdbcType=JdbcType.INTEGER),
        @Result(column="class_id", property="classId", jdbcType=JdbcType.INTEGER)
    })
    List<Subject> selectByExample(SubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @Select({
        "select",
        "id, name, subject_code, class_id",
        "from subject",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR),
        @Result(column="subject_code", property="subjectCode", jdbcType=JdbcType.INTEGER),
        @Result(column="class_id", property="classId", jdbcType=JdbcType.INTEGER)
    })
    Subject selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @UpdateProvider(type=SubjectSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Subject record, @Param("example") SubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @UpdateProvider(type=SubjectSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Subject record, @Param("example") SubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @UpdateProvider(type=SubjectSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Subject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table subject
     *
     * @mbg.generated Fri Oct 18 10:36:19 BDT 2019
     */
    @Update({
        "update subject",
        "set name = #{name,jdbcType=VARCHAR},",
          "subject_code = #{subjectCode,jdbcType=INTEGER},",
          "class_id = #{classId,jdbcType=INTEGER}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Subject record);
}