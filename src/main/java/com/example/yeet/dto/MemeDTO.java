package com.example.yeet.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemeDTO {
    private Long id;
    @NotNull
    @NotBlank
    private UserDTO user;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String url;

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String title;
    private Double mean;
}
