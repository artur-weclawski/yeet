package com.example.yeet.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "score")
@Data
public class ScoreDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private int score;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private UserDAO user;

    @ManyToOne
    @JoinColumn(name = "meme_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private MemeDAO meme;

}
