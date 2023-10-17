package com.sideagroup.academy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDto {

    @Schema(description = "Movie average rating", example = "7.5")
    private Double averageRating;
    @Schema(description = "Number of votes received", example = "742090")
    private Integer numVotes;

}
