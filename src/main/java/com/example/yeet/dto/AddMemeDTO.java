package com.example.yeet.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddMemeDTO {
    @NotBlank
    @NotNull
    private String title;
    @NotBlank
    @NotNull
    private String url;
    @NotBlank
    @NotNull
    private Long user_id;
}
