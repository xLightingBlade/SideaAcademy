package com.sideagroup.academy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Table(name = "celebrity")
@Getter
@Setter
public class Celebrity {

    @Id
    @Column(length = 200)
    private String id;

    @Column(length = 1000, nullable = false)
    private String primaryName;

    private Integer birthYear;

    private Integer deathYear;


    //dichiaro che per ottenere i film di una celebrita, bisogna usare il campo celebrity, di MovieCelebrity
    @OneToMany(mappedBy = "celebrity")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<MovieCelebrity> titles;

}
