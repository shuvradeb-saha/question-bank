package spl.question.bank.service.test;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

public class Test {

    public void run() {
        Question question = new MCQ();
    }

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            property = "type")
    @JsonSubTypes({
            @JsonSubTypes.Type(value = MCQ.class, name = "MCQ"),
            @JsonSubTypes.Type(value = CQ.class, name = "CQ")
    })
    interface Question {
        QuestionType getType();
    }

    enum QuestionType {
        MCQ, CQ
    }

    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            property = "mcqType")
    @JsonSubTypes({
            @JsonSubTypes.Type(value = PolynomialMCQ.class, name = "polynomial"),
            @JsonSubTypes.Type(value = GeneralMCQ.class, name = "general"),
            @JsonSubTypes.Type(value = StemBasedMCQ.class, name = "stem")
    })
    class MCQ implements Question {
        private QuestionType type;
        private MCQType mcqType;

        @Override
        public QuestionType getType() {
            return QuestionType.MCQ;
        }
    }

    class CQ implements Question {
        private QuestionType type;

        @Override
        public QuestionType getType() {
            return QuestionType.CQ;
        }
    }

    enum MCQType {
        polynomial, general, stem
    }

    class PolynomialMCQ extends MCQ {
        private MCQType mcqType;
    }

    class GeneralMCQ extends MCQ {
        private MCQType mcqType;
    }

    class StemBasedMCQ extends MCQ {
        private MCQType mcqType;
    }
}
