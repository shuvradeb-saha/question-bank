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
import spl.question.bank.database.model.TeacherSubject;
import spl.question.bank.database.model.TeacherSubjectExample;

public interface TeacherSubjectMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @SelectProvider(type=TeacherSubjectSqlProvider.class, method="countByExample")
    long countByExample(TeacherSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @DeleteProvider(type=TeacherSubjectSqlProvider.class, method="deleteByExample")
    int deleteByExample(TeacherSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Delete({
        "delete from teacher_subject",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Insert({
        "insert into teacher_subject (teacher_id, subject_id)",
        "values (#{teacherId,jdbcType=INTEGER}, #{subjectId,jdbcType=INTEGER})"
    })
    @SelectKey(statement="select currval('teacher_subject_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(TeacherSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @InsertProvider(type=TeacherSubjectSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('teacher_subject_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(TeacherSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @SelectProvider(type=TeacherSubjectSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="teacher_id", property="teacherId", jdbcType=JdbcType.INTEGER),
        @Result(column="subject_id", property="subjectId", jdbcType=JdbcType.INTEGER)
    })
    List<TeacherSubject> selectByExample(TeacherSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Select({
        "select",
        "id, teacher_id, subject_id",
        "from teacher_subject",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="teacher_id", property="teacherId", jdbcType=JdbcType.INTEGER),
        @Result(column="subject_id", property="subjectId", jdbcType=JdbcType.INTEGER)
    })
    TeacherSubject selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=TeacherSubjectSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") TeacherSubject record, @Param("example") TeacherSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=TeacherSubjectSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") TeacherSubject record, @Param("example") TeacherSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @UpdateProvider(type=TeacherSubjectSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(TeacherSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table teacher_subject
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    @Update({
        "update teacher_subject",
        "set teacher_id = #{teacherId,jdbcType=INTEGER},",
          "subject_id = #{subjectId,jdbcType=INTEGER}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(TeacherSubject record);
}