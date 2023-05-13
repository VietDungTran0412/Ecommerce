package com.dung.ecommerce.service;

import com.dung.ecommerce.handler.exception.InvalidArgumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SmtpService {
    private final JavaMailSender mailSender;

    public void send(String to, String subject, String text, String from) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom(from);
        mailSender.send(message);
    }

    public String sendSubscribeEmail(String to) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Matcher matcher = Pattern.compile(regexPattern).matcher(to);
        if(!matcher.matches()) {
            throw new InvalidArgumentException("Email is not valid!");
        }
        String subject = "NEW SUBSCRIPTION CONFIRMED";
        String text = "Thank you for subscribing our service! "
                + "You will receive monthly discount announcement and further information about "
                + "best seller products!";
        String from = "noreply@ecommerce.au";
        send(to, subject, text, from);
        return "You have successfully subscribed Ecommerce!";
    }

}
