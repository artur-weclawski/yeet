package com.example.yeet.controller;


import com.example.yeet.converter.MemeConverter;
import com.example.yeet.dto.AddMemeDTO;
import com.example.yeet.dto.MemeDTO;
import com.example.yeet.service.MemeServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/")
@RestController
@CrossOrigin(value = "*", maxAge = 3600)
@RequiredArgsConstructor
public class MemeController {
    private final MemeServiceInterface memeServiceInterface;

    @GetMapping("")
    public List<MemeDTO> getAllMemes(){
        return MemeConverter.mapToMemesDto(memeServiceInterface.findAllMemes());
    }

    @GetMapping("memes/user/{name}")
    public List<MemeDTO> findMemesByUser_Name(@PathVariable String name){
            return MemeConverter.mapToMemesDto(memeServiceInterface.findMemesByUser_Name(name));
    }

    @PostMapping("meme")
    public MemeDTO addMeme(@RequestBody AddMemeDTO meme){
        return MemeConverter.mapToMemeDto(memeServiceInterface.addMeme(meme));
    }

    @GetMapping("meme/{meme_id}")
    public MemeDTO getMeme(@PathVariable long meme_id){
        return MemeConverter.mapToMemeDto(memeServiceInterface.findMemeById(meme_id));
    }

    @DeleteMapping("meme/{meme_id}")
    public ResponseEntity<?> removeMeme(@PathVariable long meme_id){
        memeServiceInterface.removeMeme(meme_id);
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message", "Meme deleted");
        return new ResponseEntity<>(nameToMessage, HttpStatus.OK);
    }
}
