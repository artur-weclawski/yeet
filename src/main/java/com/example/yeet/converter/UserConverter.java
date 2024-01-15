package com.example.yeet.converter;

import com.example.yeet.dto.UserDTO;
import com.example.yeet.models.UserDAO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserConverter {
    public static UserDTO mapToUserDto(UserDAO user){
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public static List<UserDTO> mapToUsersDto(List<UserDAO> users){
        return users.stream()
                .map(UserConverter::mapToUserDto)
                .toList();
    }
}
