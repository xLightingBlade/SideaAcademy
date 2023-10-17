package com.sideagroup.academy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.boot.jaxb.internal.stax.MappingEventReader;

@Getter
@Setter
@Entity
@Table(name = "rating")
public class Rating {

    @Id
    //diciamo che l'id deve essere autogenerato. Secondo quale strategia?
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Double averageRating;
    @Column(nullable = false)
    private Integer numVotes;

    @OneToOne
    //Gli sto dicendo che il campo movie_id, di QUESTA tabella(rating) referenzia la colonna "id" di Movie
    //Non è necessario specificare la referencedColumn, lui si aggancia da solo alla primary key di Movie
    @JoinColumn(name = "movie_id", referencedColumnName = "id", unique = true)
    private Movie movie;

}
