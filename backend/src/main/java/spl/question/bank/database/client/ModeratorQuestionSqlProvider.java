package spl.question.bank.database.client;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.jdbc.SQL;
import spl.question.bank.database.model.ModeratorQuestion;
import spl.question.bank.database.model.ModeratorQuestionExample.Criteria;
import spl.question.bank.database.model.ModeratorQuestionExample.Criterion;
import spl.question.bank.database.model.ModeratorQuestionExample;

public class ModeratorQuestionSqlProvider {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String countByExample(ModeratorQuestionExample example) {
        SQL sql = new SQL();
        sql.SELECT("count(*)").FROM("moderator_question");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String deleteByExample(ModeratorQuestionExample example) {
        SQL sql = new SQL();
        sql.DELETE_FROM("moderator_question");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String insertSelective(ModeratorQuestion record) {
        SQL sql = new SQL();
        sql.INSERT_INTO("moderator_question");
        
        if (record.getQuestionId() != null) {
            sql.VALUES("question_id", "#{questionId,jdbcType=INTEGER}");
        }
        
        if (record.getQuestionType() != null) {
            sql.VALUES("question_type", "#{questionType,jdbcType=VARCHAR}");
        }
        
        if (record.getModeratorId() != null) {
            sql.VALUES("moderator_id", "#{moderatorId,jdbcType=INTEGER}");
        }
        
        if (record.getAssignedDate() != null) {
            sql.VALUES("assigned_date", "#{assignedDate,jdbcType=TIMESTAMP}");
        }
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String selectByExample(ModeratorQuestionExample example) {
        SQL sql = new SQL();
        if (example != null && example.isDistinct()) {
            sql.SELECT_DISTINCT("id");
        } else {
            sql.SELECT("id");
        }
        sql.SELECT("question_id");
        sql.SELECT("question_type");
        sql.SELECT("moderator_id");
        sql.SELECT("assigned_date");
        sql.FROM("moderator_question");
        applyWhere(sql, example, false);
        
        if (example != null && example.getOrderByClause() != null) {
            sql.ORDER_BY(example.getOrderByClause());
        }
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByExampleSelective(Map<String, Object> parameter) {
        ModeratorQuestion record = (ModeratorQuestion) parameter.get("record");
        ModeratorQuestionExample example = (ModeratorQuestionExample) parameter.get("example");
        
        SQL sql = new SQL();
        sql.UPDATE("moderator_question");
        
        if (record.getId() != null) {
            sql.SET("id = #{record.id,jdbcType=INTEGER}");
        }
        
        if (record.getQuestionId() != null) {
            sql.SET("question_id = #{record.questionId,jdbcType=INTEGER}");
        }
        
        if (record.getQuestionType() != null) {
            sql.SET("question_type = #{record.questionType,jdbcType=VARCHAR}");
        }
        
        if (record.getModeratorId() != null) {
            sql.SET("moderator_id = #{record.moderatorId,jdbcType=INTEGER}");
        }
        
        if (record.getAssignedDate() != null) {
            sql.SET("assigned_date = #{record.assignedDate,jdbcType=TIMESTAMP}");
        }
        
        applyWhere(sql, example, true);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByExample(Map<String, Object> parameter) {
        SQL sql = new SQL();
        sql.UPDATE("moderator_question");
        
        sql.SET("id = #{record.id,jdbcType=INTEGER}");
        sql.SET("question_id = #{record.questionId,jdbcType=INTEGER}");
        sql.SET("question_type = #{record.questionType,jdbcType=VARCHAR}");
        sql.SET("moderator_id = #{record.moderatorId,jdbcType=INTEGER}");
        sql.SET("assigned_date = #{record.assignedDate,jdbcType=TIMESTAMP}");
        
        ModeratorQuestionExample example = (ModeratorQuestionExample) parameter.get("example");
        applyWhere(sql, example, true);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByPrimaryKeySelective(ModeratorQuestion record) {
        SQL sql = new SQL();
        sql.UPDATE("moderator_question");
        
        if (record.getQuestionId() != null) {
            sql.SET("question_id = #{questionId,jdbcType=INTEGER}");
        }
        
        if (record.getQuestionType() != null) {
            sql.SET("question_type = #{questionType,jdbcType=VARCHAR}");
        }
        
        if (record.getModeratorId() != null) {
            sql.SET("moderator_id = #{moderatorId,jdbcType=INTEGER}");
        }
        
        if (record.getAssignedDate() != null) {
            sql.SET("assigned_date = #{assignedDate,jdbcType=TIMESTAMP}");
        }
        
        sql.WHERE("id = #{id,jdbcType=INTEGER}");
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table moderator_question
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    protected void applyWhere(SQL sql, ModeratorQuestionExample example, boolean includeExamplePhrase) {
        if (example == null) {
            return;
        }
        
        String parmPhrase1;
        String parmPhrase1_th;
        String parmPhrase2;
        String parmPhrase2_th;
        String parmPhrase3;
        String parmPhrase3_th;
        if (includeExamplePhrase) {
            parmPhrase1 = "%s #{example.oredCriteria[%d].allCriteria[%d].value}";
            parmPhrase1_th = "%s #{example.oredCriteria[%d].allCriteria[%d].value,typeHandler=%s}";
            parmPhrase2 = "%s #{example.oredCriteria[%d].allCriteria[%d].value} and #{example.oredCriteria[%d].criteria[%d].secondValue}";
            parmPhrase2_th = "%s #{example.oredCriteria[%d].allCriteria[%d].value,typeHandler=%s} and #{example.oredCriteria[%d].criteria[%d].secondValue,typeHandler=%s}";
            parmPhrase3 = "#{example.oredCriteria[%d].allCriteria[%d].value[%d]}";
            parmPhrase3_th = "#{example.oredCriteria[%d].allCriteria[%d].value[%d],typeHandler=%s}";
        } else {
            parmPhrase1 = "%s #{oredCriteria[%d].allCriteria[%d].value}";
            parmPhrase1_th = "%s #{oredCriteria[%d].allCriteria[%d].value,typeHandler=%s}";
            parmPhrase2 = "%s #{oredCriteria[%d].allCriteria[%d].value} and #{oredCriteria[%d].criteria[%d].secondValue}";
            parmPhrase2_th = "%s #{oredCriteria[%d].allCriteria[%d].value,typeHandler=%s} and #{oredCriteria[%d].criteria[%d].secondValue,typeHandler=%s}";
            parmPhrase3 = "#{oredCriteria[%d].allCriteria[%d].value[%d]}";
            parmPhrase3_th = "#{oredCriteria[%d].allCriteria[%d].value[%d],typeHandler=%s}";
        }
        
        StringBuilder sb = new StringBuilder();
        List<Criteria> oredCriteria = example.getOredCriteria();
        boolean firstCriteria = true;
        for (int i = 0; i < oredCriteria.size(); i++) {
            Criteria criteria = oredCriteria.get(i);
            if (criteria.isValid()) {
                if (firstCriteria) {
                    firstCriteria = false;
                } else {
                    sb.append(" or ");
                }
                
                sb.append('(');
                List<Criterion> criterions = criteria.getAllCriteria();
                boolean firstCriterion = true;
                for (int j = 0; j < criterions.size(); j++) {
                    Criterion criterion = criterions.get(j);
                    if (firstCriterion) {
                        firstCriterion = false;
                    } else {
                        sb.append(" and ");
                    }
                    
                    if (criterion.isNoValue()) {
                        sb.append(criterion.getCondition());
                    } else if (criterion.isSingleValue()) {
                        if (criterion.getTypeHandler() == null) {
                            sb.append(String.format(parmPhrase1, criterion.getCondition(), i, j));
                        } else {
                            sb.append(String.format(parmPhrase1_th, criterion.getCondition(), i, j,criterion.getTypeHandler()));
                        }
                    } else if (criterion.isBetweenValue()) {
                        if (criterion.getTypeHandler() == null) {
                            sb.append(String.format(parmPhrase2, criterion.getCondition(), i, j, i, j));
                        } else {
                            sb.append(String.format(parmPhrase2_th, criterion.getCondition(), i, j, criterion.getTypeHandler(), i, j, criterion.getTypeHandler()));
                        }
                    } else if (criterion.isListValue()) {
                        sb.append(criterion.getCondition());
                        sb.append(" (");
                        List<?> listItems = (List<?>) criterion.getValue();
                        boolean comma = false;
                        for (int k = 0; k < listItems.size(); k++) {
                            if (comma) {
                                sb.append(", ");
                            } else {
                                comma = true;
                            }
                            if (criterion.getTypeHandler() == null) {
                                sb.append(String.format(parmPhrase3, i, j, k));
                            } else {
                                sb.append(String.format(parmPhrase3_th, i, j, k, criterion.getTypeHandler()));
                            }
                        }
                        sb.append(')');
                    }
                }
                sb.append(')');
            }
        }
        
        if (sb.length() > 0) {
            sql.WHERE(sb.toString());
        }
    }
}