
package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(User user) {

        if (userRepository.emailExists(user.getEmail())) {
            return "Email already registered!";
        }

        String encodedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        userRepository.registerUser(user);

        return "User registered successfully!";
    }

    public Map<String, Object> loginUser(String email, String password) {

        Map<String, Object> result = new HashMap<>();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            result.put("message", "Email not registered!");
            return result;
        }

        if (passwordEncoder.matches(password, user.getPassword())) {
            result.put("message", "Login successful!");
            result.put("userId", user.getUserId());
            return result;
        }

        result.put("message", "Invalid password!");
        return result;
    }
}
