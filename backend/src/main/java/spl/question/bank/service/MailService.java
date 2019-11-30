package spl.question.bank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
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

  public MailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  public boolean sendMailWithCredentials(String receiverEmail, String name, String password) {
    // SimpleMailMessage msg = new SimpleMailMessage();
    MimeMessage msg = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(msg, false);
      helper.setTo(receiverEmail);
      helper.setSubject("Question Bank Credentials");
      String credText =
          "<div><p>Hello, %s your new Question Bank "
              + "account is ready to use.</p> "
              + "<b>Confidential Login credentials:</b>"
              + "<p><em>user: %s <br/>"
              + "password: %s</em>"
              + "</p></div>";
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

  @Async
  public void sendEmailToModerator(String receiverEmail, String name) {
    MimeMessage msg = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(msg, false);
      helper.setTo(receiverEmail);
      helper.setSubject("Question Bank New Question");
      String text =
          "<div><p>Hello %s, A new question has submitted in the question bank for you. "
              + "<p>Please review the question and perform necessary operation."
              + "</p></div>";
      helper.setText(String.format(text, name, receiverEmail), true);
    } catch (MessagingException e) {
      logger.info("Unable to build message");
    }
    try {
      javaMailSender.send(msg);
    } catch (Exception e) {
      logger.info("Unable to send mail to => {}", receiverEmail);
    }
  }

  @Async
  public void sendMailWithOtp(String receiverEmail, Integer otpcode) {
    MimeMessage msg = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper helper = new MimeMessageHelper(msg, false);
      helper.setTo(receiverEmail);
      helper.setSubject("Question Bank Password Reset OTP");
      String text =
          "<div><p> Use <b>%s</b> as your password reset otp for Question Bank account.</p></div>";
      helper.setText(String.format(text, otpcode), true);
    } catch (MessagingException e) {
      logger.info("Unable to build message");
    }
    try {
      javaMailSender.send(msg);
    } catch (Exception e) {
      logger.info("Unable to send mail to => {}", receiverEmail);
    }
  }
}
