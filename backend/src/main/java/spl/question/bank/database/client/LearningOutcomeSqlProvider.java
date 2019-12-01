package spl.question.bank.database.client;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.jdbc.SQL;
import spl.question.bank.database.model.LearningOutcome;
import spl.question.bank.database.model.LearningOutcomeExample.Criteria;
import spl.question.bank.database.model.LearningOutcomeExample.Criterion;
import spl.question.bank.database.model.LearningOutcomeExample;

public class LearningOutcomeSqlProvider {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String countByExample(LearningOutcomeExample example) {
        SQL sql = new SQL();
        sql.SELECT("count(*)").FROM("learning_outcome");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String deleteByExample(LearningOutcomeExample example) {
        SQL sql = new SQL();
        sql.DELETE_FROM("learning_outcome");
        applyWhere(sql, example, false);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String insertSelective(LearningOutcome record) {
        SQL sql = new SQL();
        sql.INSERT_INTO("learning_outcome");
        
        if (record.getOutcome() != null) {
            sql.VALUES("outcome", "#{outcome,jdbcType=VARCHAR}");
        }
        
        if (record.getChapterId() != null) {
            sql.VALUES("chapter_id", "#{chapterId,jdbcType=INTEGER}");
        }
        
        if (record.getSubjectId() != null) {
            sql.VALUES("subject_id", "#{subjectId,jdbcType=INTEGER}");
        }
        
        if (record.getClassId() != null) {
            sql.VALUES("class_id", "#{classId,jdbcType=INTEGER}");
        }
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String selectByExample(LearningOutcomeExample example) {
        SQL sql = new SQL();
        if (example != null && example.isDistinct()) {
            sql.SELECT_DISTINCT("id");
        } else {
            sql.SELECT("id");
        }
        sql.SELECT("outcome");
        sql.SELECT("chapter_id");
        sql.SELECT("subject_id");
        sql.SELECT("class_id");
        sql.FROM("learning_outcome");
        applyWhere(sql, example, false);
        
        if (example != null && example.getOrderByClause() != null) {
            sql.ORDER_BY(example.getOrderByClause());
        }
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByExampleSelective(Map<String, Object> parameter) {
        LearningOutcome record = (LearningOutcome) parameter.get("record");
        LearningOutcomeExample example = (LearningOutcomeExample) parameter.get("example");
        
        SQL sql = new SQL();
        sql.UPDATE("learning_outcome");
        
        if (record.getId() != null) {
            sql.SET("id = #{record.id,jdbcType=INTEGER}");
        }
        
        if (record.getOutcome() != null) {
            sql.SET("outcome = #{record.outcome,jdbcType=VARCHAR}");
        }
        
        if (record.getChapterId() != null) {
            sql.SET("chapter_id = #{record.chapterId,jdbcType=INTEGER}");
        }
        
        if (record.getSubjectId() != null) {
            sql.SET("subject_id = #{record.subjectId,jdbcType=INTEGER}");
        }
        
        if (record.getClassId() != null) {
            sql.SET("class_id = #{record.classId,jdbcType=INTEGER}");
        }
        
        applyWhere(sql, example, true);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByExample(Map<String, Object> parameter) {
        SQL sql = new SQL();
        sql.UPDATE("learning_outcome");
        
        sql.SET("id = #{record.id,jdbcType=INTEGER}");
        sql.SET("outcome = #{record.outcome,jdbcType=VARCHAR}");
        sql.SET("chapter_id = #{record.chapterId,jdbcType=INTEGER}");
        sql.SET("subject_id = #{record.subjectId,jdbcType=INTEGER}");
        sql.SET("class_id = #{record.classId,jdbcType=INTEGER}");
        
        LearningOutcomeExample example = (LearningOutcomeExample) parameter.get("example");
        applyWhere(sql, example, true);
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    public String updateByPrimaryKeySelective(LearningOutcome record) {
        SQL sql = new SQL();
        sql.UPDATE("learning_outcome");
        
        if (record.getOutcome() != null) {
            sql.SET("outcome = #{outcome,jdbcType=VARCHAR}");
        }
        
        if (record.getChapterId() != null) {
            sql.SET("chapter_id = #{chapterId,jdbcType=INTEGER}");
        }
        
        if (record.getSubjectId() != null) {
            sql.SET("subject_id = #{subjectId,jdbcType=INTEGER}");
        }
        
        if (record.getClassId() != null) {
            sql.SET("class_id = #{classId,jdbcType=INTEGER}");
        }
        
        sql.WHERE("id = #{id,jdbcType=INTEGER}");
        
        return sql.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table learning_outcome
     *
     * @mbg.generated Sun Dec 01 11:22:53 BDT 2019
     */
    protected void applyWhere(SQL sql, LearningOutcomeExample example, boolean includeExamplePhrase) {
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