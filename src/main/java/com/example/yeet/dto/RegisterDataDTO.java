package com.example.yeet.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class RegisterDataDTO {
    @NotNull
    @NotBlank(message = "Wrong name")
    @Size(min = 5)
    @Size(max = 12)
    private String name;

    @NotNull
    @NotBlank(message = "Wrong email")
    @Email
    private String email;

    @NotNull
    @NotBlank(message = "Wrong password")
    @Size(min = 8)
    @Size(max = 16)
    private String password;
}
