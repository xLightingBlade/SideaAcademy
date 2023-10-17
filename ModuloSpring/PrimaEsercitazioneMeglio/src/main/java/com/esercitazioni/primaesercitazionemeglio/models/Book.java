package com.esercitazioni.primaesercitazionemeglio.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 13, nullable = false)
    private String isbn;
    @Column(length = 500, nullable = false)
    private String title;
    private String author;
    private String description;


    @OneToMany(mappedBy = "book")
    private Set<BookReader> readers = new HashSet<>();

}
