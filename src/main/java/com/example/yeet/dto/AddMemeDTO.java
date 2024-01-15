package com.example.yeet.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddMemeDTO {
    private String title;
    private String url;
    private Long user_id;
}
