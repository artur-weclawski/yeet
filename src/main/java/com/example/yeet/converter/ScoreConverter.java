package com.example.yeet.converter;

import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.dto.ScoreSumDTO;
import com.example.yeet.models.ScoreDAO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)

public class ScoreConverter {
    public static ScoreDTO mapToScoreDTO(ScoreDAO score){
        return ScoreDTO.builder()
                .score(score.getScore())
                .user_id(score.getUser().getId())
                .meme_id(score.getMeme().getId())
                .build();
    }

    public static List<ScoreDTO> mapToScoresDTO(List<ScoreDAO> scores){
        return scores.stream()
                .map(ScoreConverter::mapToScoreDTO).toList();
    }

    public static ScoreSumDTO mapToScoreSumDTO(Double sum){
        return ScoreSumDTO.builder()
                .score(sum).build();
    }
}
