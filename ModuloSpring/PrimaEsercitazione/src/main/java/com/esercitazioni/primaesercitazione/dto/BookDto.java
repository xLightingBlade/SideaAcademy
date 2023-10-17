package com.esercitazioni.primaesercitazione.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {
    private Integer id;
    private String reader;
    private String isbn;
    private String title;
    private String author;
    private String description;
}
