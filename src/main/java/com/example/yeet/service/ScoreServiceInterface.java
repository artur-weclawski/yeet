package com.example.yeet.service;

import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.models.ScoreDAO;

public interface ScoreServiceInterface {
    public ScoreDAO addOrUpdateScore(ScoreDTO score);
    public ScoreDAO updateScore(int score, Long user_id, Long meme_id);
}
