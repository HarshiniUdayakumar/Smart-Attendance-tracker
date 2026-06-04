package com.harshini.authapi.controller;

import com.harshini.authapi.dto.LoginResponse;
import com.harshini.authapi.entity.User;
import com.harshini.authapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody User loginUser) {
        return userService.loginUser(loginUser);
    }
}