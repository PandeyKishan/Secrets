package com.example.secrets.controller;

import com.example.secrets.dto.SecretRequest;
import com.example.secrets.dto.UserSecretsResponse;
import com.example.secrets.model.User;
import com.example.secrets.repository.UserRepository;
import com.example.secrets.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SecretController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/public/secrets")
    public List<UserSecretsResponse> getPublicSecrets() {
        return userRepository.findAll().stream()
                .filter(user -> user.getSecret() != null && !user.getSecret().isEmpty())
                .map(user -> new UserSecretsResponse(user.getUsername(), user.getSecret()))
                .collect(Collectors.toList());
    }

    @GetMapping("/secrets")
    public List<UserSecretsResponse> getAuthenticatedSecrets() {
        // In the original app, /secrets returns all users with secrets if authenticated.
        return getPublicSecrets();
    }

    @PostMapping("/secrets/submit")
    public ResponseEntity<?> submitSecret(@RequestBody SecretRequest secretRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        user.getSecret().add(secretRequest.getSecret());
        userRepository.save(user);
        
        return ResponseEntity.ok("Secret submitted successfully!");
    }
}
