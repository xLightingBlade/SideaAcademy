package com.esercitazioni.primaesercitazionemeglio.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AllBookReadersDto {
    private PaginationDto pagination;
    private List<BookReaderDto> bookReaders;

    public AllBookReadersDto() {
        pagination = new PaginationDto();
        bookReaders = new ArrayList<>();
    }
}
