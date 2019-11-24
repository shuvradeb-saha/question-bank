package spl.question.bank;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import spl.question.bank.database.MapperMarker;

@SpringBootApplication(scanBasePackages = {"spl.question.bank"})
@MapperScan(markerInterface = MapperMarker.class, basePackages = {"spl.question.bank"})
@EnableAsync
public class QuestionBankApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuestionBankApplication.class, args);
    }

}
