package com.example.yeet.dto;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDataDTO {

    @NotNull
    private String name;
    @NotNull
    private String password;
}
