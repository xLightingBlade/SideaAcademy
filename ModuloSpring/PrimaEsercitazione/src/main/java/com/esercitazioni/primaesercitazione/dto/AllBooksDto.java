package com.esercitazioni.primaesercitazione.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AllBooksDto {

    private PaginationDto pagination;
    private List<BookDto> books;

    public AllBooksDto() {
        pagination = new PaginationDto();
        books = new ArrayList<>();
    }
}
