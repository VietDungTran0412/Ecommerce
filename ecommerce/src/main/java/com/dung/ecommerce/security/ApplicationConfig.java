package com.dung.ecommerce.security;


import com.dung.ecommerce.document.User;
import com.dung.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Properties;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UserService userService;

    @Value("${spring.email.host}")
    private String smtpHost;

    @Value("${spring.mail.port}")
    private String smtpPort;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String auth;

    @Value("${spring.email.username}")
    private String smtpUser;

    @Value("${spring.email.password}")
    private String smtpPassword;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                final User user = userService.findUserByEmail(email);
                if(user == null) {
                    throw new UsernameNotFoundException("Username not found !");
                }
                return user;
            }
        };
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(smtpHost);
        sender.setPort(Integer.valueOf(smtpPort));
        sender.setUsername(smtpUser);
        sender.setPassword(smtpPassword);
        Properties props = sender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", auth);
        sender.setJavaMailProperties(props);
        return sender;
    }
}
