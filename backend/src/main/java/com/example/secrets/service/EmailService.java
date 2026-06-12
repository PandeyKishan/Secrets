package com.example.secrets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Secrets App Verification Code");
        message.setText("Welcome to Secrets! \n\nYour verification code is: " + otp + "\n\nThis code will expire in 5 minutes. If you did not request this, please ignore this email.");
        mailSender.send(message);
    }
}
