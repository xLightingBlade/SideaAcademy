package com.sideagroup.academy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "movie_celebrity")
@Getter
@Setter
public class MovieCelebrity {

    @EmbeddedId
    private MovieCelebrityKey id;

    @ManyToOne
    @MapsId("celebrityId") //"per recuperare la parte di chiave di celebrity, usa il campo celebrityId della chiave
    private Celebrity celebrity;

    @ManyToOne
    @MapsId("movieId")
    private Movie movie;

    @Column(length = 1000)
    private String category;

    @Column(length = 1000)
    private String characters;

    public MovieCelebrity() {
        this(null);
    }

    public MovieCelebrity(MovieCelebrityKey id) {
        this.id = id;
    }

}
