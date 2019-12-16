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
import spl.question.bank.database.model.Class;
import spl.question.bank.database.model.ClassExample;

public interface ClassMapper extends MapperMarker {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @SelectProvider(type=ClassSqlProvider.class, method="countByExample")
    long countByExample(ClassExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @DeleteProvider(type=ClassSqlProvider.class, method="deleteByExample")
    int deleteByExample(ClassExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Delete({
        "delete from class",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Insert({
        "insert into class (name)",
        "values (#{name,jdbcType=VARCHAR})"
    })
    @SelectKey(statement="select currval('class_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insert(Class record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @InsertProvider(type=ClassSqlProvider.class, method="insertSelective")
    @SelectKey(statement="select currval('class_id_seq')", keyProperty="id", before=false, resultType=Integer.class)
    int insertSelective(Class record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @SelectProvider(type=ClassSqlProvider.class, method="selectByExample")
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR)
    })
    List<Class> selectByExample(ClassExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Select({
        "select",
        "id, name",
        "from class",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR)
    })
    Class selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ClassSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Class record, @Param("example") ClassExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ClassSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Class record, @Param("example") ClassExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @UpdateProvider(type=ClassSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Class record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table class
     *
     * @mbg.generated Mon Dec 16 23:28:16 BDT 2019
     */
    @Update({
        "update class",
        "set name = #{name,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Class record);
}