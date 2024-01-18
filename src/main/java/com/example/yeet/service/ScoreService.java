package com.example.yeet.service;

import com.example.yeet.dto.MemeDTO;
import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.dto.UserDTO;
import com.example.yeet.models.MemeDAO;
import com.example.yeet.models.ScoreDAO;
import com.example.yeet.models.UserDAO;
import com.example.yeet.repository.ScoreRepository;
import com.example.yeet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ScoreService implements ScoreServiceInterface {

    private final ScoreRepository scoreRepository;
    private final UserServiceInterface userServiceInterface;
    private final MemeServiceInterface memeServiceInterface;


    @Override
    public ScoreDAO addOrUpdateScore(ScoreDTO score) {
        ScoreDAO newScore = new ScoreDAO();
        newScore.setScore(score.getScore());
        newScore.setMeme(memeServiceInterface.findMemeById(score.getMeme_id()));
        newScore.setUser(userServiceInterface.findUserById(score.getUser_id()));
        if(scoreRepository.existsScoreDAOByUser_IdAndMeme_Id(score.getUser_id(), score.getMeme_id())){
            return updateScore(score.getScore(), score.getUser_id(), score.getMeme_id());
        }else {
            return scoreRepository.save(newScore);
        }
    }

    @Override
    public ScoreDAO updateScore(int score, Long user_id, Long meme_id) {
        ScoreDAO newScore = scoreRepository.findScoreDAOByUser_IdAndMeme_Id(user_id, meme_id);
        newScore.setScore(score);
        return scoreRepository.save(newScore);
    }
}
