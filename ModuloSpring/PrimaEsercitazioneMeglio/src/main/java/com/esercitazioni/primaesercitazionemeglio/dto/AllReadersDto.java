package com.esercitazioni.primaesercitazionemeglio.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AllReadersDto {
    private PaginationDto pagination;
    private List<ReaderDto> readers;

    public AllReadersDto() {
        pagination = new PaginationDto();
        readers = new ArrayList<>();
    }
}
