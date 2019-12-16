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
import spl.question.bank.database.model.Chapter;
import spl.question.bank.database.model.ChapterExample;

public interface ChapterMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @SelectProvider(type=ChapterSqlProvider.class, method="countByExample")
    long countByExample(ChapterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @DeleteProvider(type=ChapterSqlProvider.class, method="deleteByExample")
    int deleteByExample(ChapterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Delete({
        "delete from chapter",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Insert({
        "insert into chapter (name, class_id, ",
        "subject_id)",
        "values (#{name,jdbcType=VARCHAR}, #{classId,jdbcType=INTEGER}, ",
        "#{subjectId,jdbcType=INTEGER})"
    })
    @SelectKey(statement="select currval('chapter_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(Chapter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @InsertProvider(type=ChapterSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('chapter_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(Chapter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @SelectProvider(type=ChapterSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR),
        @Result(column="class_id", property="classId", jdbcType=JdbcType.INTEGER),
        @Result(column="subject_id", property="subjectId", jdbcType=JdbcType.INTEGER)
    })
    List<Chapter> selectByExample(ChapterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Select({
        "select",
        "id, name, class_id, subject_id",
        "from chapter",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR),
        @Result(column="class_id", property="classId", jdbcType=JdbcType.INTEGER),
        @Result(column="subject_id", property="subjectId", jdbcType=JdbcType.INTEGER)
    })
    Chapter selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ChapterSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Chapter record, @Param("example") ChapterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ChapterSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Chapter record, @Param("example") ChapterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ChapterSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Chapter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chapter
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Update({
        "update chapter",
        "set name = #{name,jdbcType=VARCHAR},",
          "class_id = #{classId,jdbcType=INTEGER},",
          "subject_id = #{subjectId,jdbcType=INTEGER}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Chapter record);
}