package com.sideagroup.academy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

//Nuove annotazioni, provengono da Project Lombok. Generano automaticamente getter e setter, senza doverli mettere noi
@Getter
@Setter
public class CelebrityDto {

    @Schema(description = "Celebrity Id", example = "nm0000168")
    private String id;
    @Schema(description = "Celebrity name", example = "Samuel L. Jackson")
    private String name;
    @Schema(description = "Celebrity year of birth", example = "1948")
    private Integer birthYear;
    @Schema(description = "Celebrity year of death", example = "null")
    private Integer deathYear;
    @Schema(description = "List of movies where celebrity appears")
    private List<MovieCelebrityDto> movies;

    public CelebrityDto() {
        movies = new ArrayList<>();
    }

}
