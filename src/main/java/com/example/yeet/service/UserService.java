package com.example.yeet.service;

import com.example.yeet.exceptions.EmailAlreadyTakenException;
import com.example.yeet.exceptions.SamePasswordException;
import com.example.yeet.exceptions.UserAlreadyExistsException;
import com.example.yeet.exceptions.WrongDataProvidedException;
import com.example.yeet.models.UserDAO;
import com.example.yeet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService, UserServiceInterface {

    private final UserRepository userRepository;
    private final PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDAO user = userRepository.findByName(username);
        if (user == null){
            throw new
                    UsernameNotFoundException("User not found with username: " +
                    username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getName(), user.getPassword(),new ArrayList<>());
    }

    @Override
    public UserDAO save(UserDAO user){
        if(userRepository.existsUserByName(user.getName())){
            throw new UserAlreadyExistsException(user.getName());
        } else if (userRepository.existsUserByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException(user.getEmail());
        } else if(user.getName().isEmpty() || user.getEmail().isEmpty()){
            throw new WrongDataProvidedException();
        }
        else{
            UserDAO newUser = new UserDAO();
            newUser.setName(user.getName());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            return userRepository.save(newUser);
        }
    }
    @Override
    public UserDAO findUserByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public UserDAO findUserById(Long user_id) {
        return userRepository.findUserDAOById(user_id);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDAO updateName(String name, String newName) {
        if(userRepository.existsUserByName(newName)){
            throw new UserAlreadyExistsException(newName);
        }else{
            UserDAO user = userRepository.findByName(name);
            user.setName(newName);
            return userRepository.save(user);
        }
    }

    @Override
    public UserDAO updatePassword(String name, String newPassword) {
        UserDAO user = userRepository.findByName(name);
        if(user.getPassword().equals(bcryptEncoder.encode(newPassword))){
            throw new SamePasswordException();
        }
        else{
            user.setPassword(bcryptEncoder.encode(newPassword));
            return userRepository.save(user);
        }

    }
}
