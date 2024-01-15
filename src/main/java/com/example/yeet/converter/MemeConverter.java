package com.example.yeet.converter;

import com.example.yeet.dto.MemeDTO;
import com.example.yeet.models.MemeDAO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)

public class MemeConverter {
    public static MemeDTO mapToMemeDto(MemeDAO meme){
        return MemeDTO.builder()
                .title(meme.getTitle())
                .url(meme.getUrl())
                .user(UserConverter.mapToUserDto(meme.getUser()))
                .build();
    }
    public static List<MemeDTO> mapToMemesDto(List<MemeDAO> memes){
        return memes.stream()
                .map(MemeConverter::mapToMemeDto).toList();
    }

}
