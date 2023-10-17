package com.esercitazioni.primaesercitazione.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "book", uniqueConstraints = {@UniqueConstraint(columnNames = {"reader", "isbn"})})
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String reader;
    @Column(length = 13)
    private String isbn;
    @Column(length = 500, nullable = false)
    private String title;
    private String author;
    private String description;

}
