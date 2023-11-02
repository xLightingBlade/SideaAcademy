package com.sideagroup.academy.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetAllMoviesResponseDto {

    private PaginationDto pagination;
    private List<MovieDto> data;

    public GetAllMoviesResponseDto() {
        pagination = new PaginationDto();
        data = new ArrayList<>();
    }

}
