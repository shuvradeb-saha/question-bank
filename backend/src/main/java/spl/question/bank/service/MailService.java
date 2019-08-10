package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;

    private String credText = "<div><p>Hello, %s your new Question Bank " +
            "account is ready to use.</p> " +
            "<b>Confidential Login credentials:</b>" +
            "<p><em>user: %s <br/>" +
            "password: %s</em>" +
            "</p></div>";

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public boolean sendMailWithCredentials(String receiverEmail, String name, String password) {
        //SimpleMailMessage msg = new SimpleMailMessage();
        MimeMessage msg = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(msg, false);
            helper.setTo(receiverEmail);
            helper.setSubject("Question Bank Credentials");
            helper.setText(String.format(credText, name, receiverEmail, password), true);
        } catch (MessagingException e) {
            logger.info("Unable to build message");
            return false;
        }
        try {
            javaMailSender.send(msg);
            return true;
        } catch (Exception e) {
            logger.info("Unable to send mail to => {}", receiverEmail);
            return false;
        }
    }
}
