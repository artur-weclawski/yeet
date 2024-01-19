package com.example.yeet.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScoreDTO {
    private Long meme_id;
    private Long user_id;
    private int score;
}
