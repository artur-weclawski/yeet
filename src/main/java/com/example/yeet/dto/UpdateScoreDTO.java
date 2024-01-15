package com.example.yeet.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateScoreDTO {
    private int newScore;
    private long user_id;
    private long meme_id;
}
