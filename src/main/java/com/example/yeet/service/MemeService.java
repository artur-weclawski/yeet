package com.example.yeet.service;

import com.example.yeet.converter.ScoreConverter;
import com.example.yeet.dto.AddMemeDTO;
import com.example.yeet.dto.ScoreDTO;
import com.example.yeet.exceptions.MemeNotFoundException;
import com.example.yeet.models.MemeDAO;
import com.example.yeet.models.ScoreDAO;
import com.example.yeet.repository.MemeRepository;
import com.example.yeet.repository.ScoreRepository;
import com.example.yeet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemeService implements MemeServiceInterface{

    private final MemeRepository memeRepository;
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    @Override
    public List<MemeDAO> findMemesByUser_Name(String name) {
        return memeRepository.findAllByUser_Name(name).orElseThrow(() -> new MemeNotFoundException(name));
    }

    @Override
    public MemeDAO addMeme(AddMemeDTO meme) {
        MemeDAO newMeme = new MemeDAO();
        newMeme.setTitle(meme.getTitle());
        newMeme.setUrl(meme.getUrl());
        newMeme.setUser(userRepository.findUserDAOById(meme.getUser_id()));
        return memeRepository.save(newMeme);
    }

    @Override
    public void removeMeme(Long meme_id) {
        memeRepository.deleteById(meme_id);
    }

    @Override
    public List<MemeDAO> findAllMemes() {
        return memeRepository.findAll();
    }

    @Override
    public MemeDAO findMemeById(Long meme_id) {
        return memeRepository.findMemeDAOById(meme_id);
    }

    public static Double countMean(List<ScoreDAO> scoresList){
        Double sum = scoresList.stream()
                .mapToDouble(ScoreDAO::getScore)
                .sum();
        long count = scoresList.size();
        if(count == 0){
            count = 1;
        }
        return sum/count;
    }

    @Override
    public Double meanMemeScore(Long meme_id) {
        return countMean(scoreRepository.findScoreDAOSByMeme_Id(meme_id));
    }


}
