package com.example.yeet.controller;


import com.example.yeet.converter.ScoreConverter;
import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.dto.ScoreSumDTO;
import com.example.yeet.dto.UpdateScoreDTO;
import com.example.yeet.service.MemeServiceInterface;
import com.example.yeet.service.ScoreServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/score")
@RestController
@CrossOrigin(value = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ScoreController {
    private final ScoreServiceInterface scoreServiceInterface;
    private final MemeServiceInterface memeServiceInterface;

    @PostMapping("")
    public ScoreDTO addScore(@RequestBody ScoreDTO scoreDTO){
        return ScoreConverter.mapToScoreDTO(scoreServiceInterface.addScore(scoreDTO));
    }

    @PutMapping("")
    public ScoreDTO updateScore(@RequestBody UpdateScoreDTO updateScoreDTO){
        return ScoreConverter.mapToScoreDTO(scoreServiceInterface.updateScore(updateScoreDTO.getNewScore(), updateScoreDTO.getUser_id(), updateScoreDTO.getMeme_id()));
    }

    @GetMapping("/{meme_id}")
    public ScoreSumDTO getMemeScoreSum(@PathVariable Long meme_id){
        return ScoreConverter.mapToScoreSumDTO(memeServiceInterface.meanMemeScore(meme_id));
    }
}
