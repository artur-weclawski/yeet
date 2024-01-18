package com.example.yeet.converter;

import com.example.yeet.dto.MemeDTO;
import com.example.yeet.models.MemeDAO;
import com.example.yeet.service.MemeService;
import com.example.yeet.service.MemeServiceInterface;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)

public class MemeConverter {


    public static MemeDTO mapToMemeDto(MemeDAO meme){
        return MemeDTO.builder()
                .id(meme.getId())
                .title(meme.getTitle())
                .url(meme.getUrl())
                .user(UserConverter.mapToUserDto(meme.getUser()))
                .mean(MemeService.countMean(meme.getScores()))
                .build();
    }
    public static List<MemeDTO> mapToMemesDto(List<MemeDAO> memes){
        return memes.stream()
                .map(MemeConverter::mapToMemeDto).toList();
    }

}
