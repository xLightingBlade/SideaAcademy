package com.sideagroup.academy.dto;

import lombok.Getter;
import lombok.Setter;

//Per impaginare i risultati
@Getter
@Setter
public class PaginationDto {
    private int currentPage;
    private int pageSize;
    private long totalElements;
    private int totalPages;

}
