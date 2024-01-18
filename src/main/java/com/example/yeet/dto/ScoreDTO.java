package com.example.yeet.dto;


import com.example.yeet.models.MemeDAO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScoreDTO {
    @NotNull
    @NotBlank
    private Long meme_id;
    @NotNull
    @NotBlank
    private Long user_id;
    private int score;
}
