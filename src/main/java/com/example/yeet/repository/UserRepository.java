package com.example.yeet.repository;

import com.example.yeet.models.UserDAO;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDAO, Long> {
    UserDAO findByName(String name);
    Boolean existsUserByName(String name);
    Boolean existsUserByEmail(String email);

    UserDAO findUserDAOById(Long user_id);
}
