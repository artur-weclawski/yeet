package com.example.yeet.service;

import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.models.MemeDAO;
import com.example.yeet.models.ScoreDAO;
import com.example.yeet.models.UserDAO;

public interface ScoreServiceInterface {
    public ScoreDAO addScore(ScoreDTO score);
    public ScoreDAO updateScore(int score, Long user_id, Long meme_id);
}
