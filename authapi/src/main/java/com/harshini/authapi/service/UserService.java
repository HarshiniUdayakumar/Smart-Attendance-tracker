package com.harshini.authapi.service;

import com.harshini.authapi.entity.User;
import com.harshini.authapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.harshini.authapi.dto.LoginResponse;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Login User
    public LoginResponse loginUser(User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("User not found", null);
        }

        if (user.getPassword().equals(loginUser.getPassword())) {
            return new LoginResponse(
                    "Login Successful",
                    user.getRole()
            );
        }

        return new LoginResponse("Invalid Password", null);
    }
}