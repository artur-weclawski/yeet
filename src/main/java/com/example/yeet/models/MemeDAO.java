package com.example.yeet.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meme")
@Data
public class MemeDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private UserDAO user;

    @OneToMany(mappedBy = "meme", cascade = CascadeType.REMOVE)
    @ToString.Exclude
    private List<ScoreDAO> scores = new ArrayList<>();
}
