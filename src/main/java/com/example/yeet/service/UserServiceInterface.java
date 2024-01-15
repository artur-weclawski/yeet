package com.example.yeet.service;

import com.example.yeet.models.UserDAO;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserServiceInterface {
    public UserDetails loadUserByUsername(String username);
    public UserDAO save(UserDAO user);
    public UserDAO findUserByName(String name);

    public UserDAO findUserById(Long user_id);

    public void deleteUser(Long id);

    public UserDAO updateName(String name, String newName);

    public UserDAO updatePassword(String name, String newPassword);
}
