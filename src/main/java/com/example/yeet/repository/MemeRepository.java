package com.example.yeet.repository;

import com.example.yeet.models.MemeDAO;
import com.example.yeet.models.ScoreDAO;
import com.example.yeet.models.UserDAO;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemeRepository extends JpaRepository<MemeDAO, Long> {
    MemeDAO findByTitle(String title);
    MemeDAO findMemeDAOById(Long id);
    Optional<List<MemeDAO>> findAllByUser_Name(String name);
    MemeDAO findMemeDAOByUser_Name(String name);
}
