package com.example.yeet.controller;


import com.example.yeet.converter.UserConverter;
import com.example.yeet.dto.UserDTO;
import com.example.yeet.service.UserServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/user")
@RestController
@CrossOrigin(value = "*", maxAge = 3600)
@RequiredArgsConstructor
public class UserController {

    private final UserServiceInterface userServiceInterface;

    @PutMapping("/changeName/{name}/{newName}")
    public UserDTO updateUserName(@PathVariable String name, @PathVariable String newName){
        return UserConverter.mapToUserDto(userServiceInterface.updateName(name, newName));
    }

    @PutMapping("/changePassword/{name}/{newPassword}")
    public UserDTO updateUserPassword(@PathVariable String name, @PathVariable String newPassword){
        return UserConverter.mapToUserDto(userServiceInterface.updatePassword(name, newPassword));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        userServiceInterface.deleteUser(userId);
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message", "Account deleted.");
        return new ResponseEntity<>(nameToMessage, HttpStatus.OK);
    }

}
