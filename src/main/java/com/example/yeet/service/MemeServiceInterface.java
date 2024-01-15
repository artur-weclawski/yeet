package com.example.yeet.service;

import com.example.yeet.dto.AddMemeDTO;
import com.example.yeet.dto.MemeDTO;
import com.example.yeet.models.MemeDAO;


import java.util.List;

public interface MemeServiceInterface {

    public List<MemeDAO> findMemesByUser_Name(String name);
    public MemeDAO addMeme(AddMemeDTO meme);

    public void removeMeme(Long meme_id);

    public List<MemeDAO> findAllMemes();

    public MemeDAO findMemeById(Long meme_id);

    public Double sumMemeScore(Long meme_id);
}
