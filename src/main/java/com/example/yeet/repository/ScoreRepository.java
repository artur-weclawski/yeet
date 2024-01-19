package com.example.yeet.repository;

import com.example.yeet.models.ScoreDAO;
import com.example.yeet.models.UserDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScoreRepository extends JpaRepository<ScoreDAO, Long> {
    ScoreDAO findScoreDAOByUser_IdAndMeme_Id(Long user_id, Long meme_id);
    List<ScoreDAO> findScoreDAOSByMeme_Id(Long meme_id);
    Boolean existsScoreDAOByUser_IdAndMeme_Id(Long user_id, Long meme_id);
}
