package com.example.yeet.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemeDTO {
    private Long id;
    private UserDTO user;
    private String url;
    private String title;
    private Double mean;
}
