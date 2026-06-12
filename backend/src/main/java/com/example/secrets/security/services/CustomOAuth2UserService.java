package com.example.secrets.security.services;

import com.example.secrets.model.User;
import com.example.secrets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String googleId = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");

        Optional<User> userByUsername = userRepository.findByUsername(email);

        if (userByUsername.isPresent()) {
            User existingUser = userByUsername.get();
            // If the user exists but has no googleId, it's a manual account
            if (existingUser.getGoogleId() == null) {
                throw new OAuth2AuthenticationException("An account already exists with this email. Please log in manually.");
            }
            // If googleId is different, update it (handles potential ID changes)
            if (!googleId.equals(existingUser.getGoogleId())) {
                 existingUser.setGoogleId(googleId);
                 userRepository.save(existingUser);
            }
        } else {
            // New user - strictly Google registration
            User user = User.builder()
                    .googleId(googleId)
                    .username(email)
                    .build();
            userRepository.save(user);
        }

        return oauth2User;
    }

}
