package com.example.secrets.controller;

import com.example.secrets.dto.JwtResponse;
import com.example.secrets.dto.LoginRequest;
import com.example.secrets.dto.OtpRequest;
import com.example.secrets.dto.RegisterRequest;
import com.example.secrets.model.OtpToken;
import com.example.secrets.model.User;
import com.example.secrets.repository.OtpTokenRepository;
import com.example.secrets.repository.UserRepository;
import com.example.secrets.security.jwt.JwtUtils;
import com.example.secrets.security.services.UserDetailsImpl;
import com.example.secrets.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  OtpTokenRepository otpTokenRepository;

  @Autowired
  EmailService emailService;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    

    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
  }

  @PostMapping("/register/request-otp")
  public ResponseEntity<?> requestOtp(@Valid @RequestBody OtpRequest otpRequest) {
    if (userRepository.existsByUsername(otpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body("Error: Email is already taken!");
    }

    String otp = String.format("%04d", new Random().nextInt(10000));
    
    OtpToken otpToken = otpTokenRepository.findByEmail(otpRequest.getEmail())
        .orElse(new OtpToken());
    
    otpToken.setEmail(otpRequest.getEmail());
    otpToken.setOtp(otp);
    otpToken.setExpiryDate(LocalDateTime.now().plusMinutes(5));
    
    otpTokenRepository.save(otpToken);
    emailService.sendOtpEmail(otpRequest.getEmail(), otp);

    return ResponseEntity.ok("Verification code sent to your email!");
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body("Error: Username is already taken!");
    }

    OtpToken otpToken = otpTokenRepository.findByEmail(signUpRequest.getUsername())
        .orElse(null);

    if (otpToken == null || !otpToken.getOtp().equals(signUpRequest.getOtp())) {
        return ResponseEntity.badRequest().body("Error: Invalid verification code!");
    }

    if (otpToken.getExpiryDate().isBefore(LocalDateTime.now())) {
        return ResponseEntity.badRequest().body("Error: Verification code has expired!");
    }

    // Create new user's account
    User user = User.builder()
        .username(signUpRequest.getUsername())
        .password(encoder.encode(signUpRequest.getPassword()))
        .build();

    userRepository.save(user);
    
    // Delete OTP after successful registration
    otpTokenRepository.deleteByEmail(signUpRequest.getUsername());

    return ResponseEntity.ok("User registered successfully!");
  }
}
