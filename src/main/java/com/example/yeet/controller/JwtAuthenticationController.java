package com.example.yeet.controller;

import com.example.yeet.config.JwtUtils;
import com.example.yeet.converter.UserConverter;
import com.example.yeet.dto.LoginDataDTO;
import com.example.yeet.dto.RegisterDataDTO;
import com.example.yeet.dto.TokenDTO;
import com.example.yeet.models.UserDAO;
import com.example.yeet.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@CrossOrigin(value = "*", maxAge = 3600)
@RequiredArgsConstructor
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtTokenUtil;
    private final UserService userDetailsService;

    @PostMapping("/login")
    public TokenDTO loginUser(@Valid @RequestBody LoginDataDTO loginDataDTO) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDataDTO.getName(), loginDataDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        final UserDAO user = userDetailsService.findUserByName(loginDataDTO.getName());
        final String token = jwtTokenUtil.generateToken(authenticate);
        return TokenDTO.builder()
                .token(token)
                .user(UserConverter.mapToUserDto(user))
                .build();
    }

    @PostMapping("/register")
    public TokenDTO registerUser(@Valid @RequestBody RegisterDataDTO registerDataDTO){
        UserDAO user = new UserDAO();
        user.setName(registerDataDTO.getName());
        user.setEmail(registerDataDTO.getEmail());
        user.setPassword(registerDataDTO.getPassword());
        UserDAO newUser = userDetailsService.save(user);
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerDataDTO.getName(), registerDataDTO.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authenticate);
                final String token  = jwtTokenUtil.generateToken(authenticate);

                return TokenDTO.builder()
                        .token(token)
                        .user(UserConverter.mapToUserDto(newUser))
                        .build();
    }
}

