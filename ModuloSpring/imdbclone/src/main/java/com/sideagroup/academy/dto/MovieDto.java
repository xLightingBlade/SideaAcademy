package com.sideagroup.academy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MovieDto {
    @Schema(description = "Movie ID", example = "tt0036177", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;
    @Schema(description = "Movie title", example = "Muhomatsu no issho", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;
    @Schema(description = "Movie release year", example = "2008", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer year;
    @Schema(description = "Movie length in minutes", example = "100", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer runningTime;
    @Schema(description = "Movie genres", example = "Action,Adventure", requiredMode = Schema.RequiredMode.REQUIRED)
    private String genres;

    @Schema(description = "Movie cast", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private List<MovieCelebrityDto> cast;
    @Schema(description = "Movie rating", requiredMode = Schema.RequiredMode.REQUIRED)
    private RatingDto rating;
    @Schema(description = "Movie information depending on country where released",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private List<CountryDto> countries;

    public MovieDto() {
        cast = new ArrayList<>();
        countries = new ArrayList<>();
    }

}
