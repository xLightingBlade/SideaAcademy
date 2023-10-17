package com.esercitazioni.primaesercitazionemeglio.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ReaderDto {
    private int id;
    private String name;
    private List<BookReaderDto> books;

    public ReaderDto() {
        books = new ArrayList<>();
    }
}
