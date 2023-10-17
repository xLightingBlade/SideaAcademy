package com.sideagroup.academy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

/* Allor, il modello modella ciò che c'è nel database e mai deve essere esposta al mondo esterno
Il dto non è detto che debba avere la stessa struttura del modello, il Dto è ciò che il mondo
esterno vede, e lo decido io
 */

//Inizia il mapping tra classi java e tabelle nel db
@Entity //dichiaro che la classe corrisponde ad un entità (modello er)
@Table(name = "movie") //dichiaro che la classe è associata ad una tabella nel db che si chiama movie
@Getter
@Setter
public class Movie {

    //notare che sto usando i tipi di Java per i vari attributi da mappare nelle varie colonne. Esempio di ORM
    //dichiaro che id è chiave della tabella
    @Id
    //dichiaro che l'attributo corrisponde ad una colonna della tabella, e gli do una lunghezza max
    @Column(length = 200)
    private String id;

    @Column(length = 1000, nullable = false)  //nullable=false equivale al vincolo not null
    private String title;

    @Column(name = "startYear")  //voglio che nella tabella il campo si chiami startYear
    private Integer year;

    private Integer runtimeMinutes;

    @Column(length = 1000)
    private String genres;

    @OneToMany(mappedBy = "movie")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<MovieCelebrity> names;

    @OneToMany(mappedBy = "movie")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Country> countries;

    @OneToOne(mappedBy = "movie")
    private Rating rating;

}
