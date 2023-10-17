package com.sideagroup.academy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class MovieCelebrityKey implements Serializable {

    @Column(length = 200)
    private String celebrityId;
    @Column(length = 200)
    private String movieId;

    public MovieCelebrityKey() {
        this(null,null);
    }

    public MovieCelebrityKey(String celebrityId, String movieId) {
        this.celebrityId = celebrityId;
        this.movieId = movieId;
    }

}
