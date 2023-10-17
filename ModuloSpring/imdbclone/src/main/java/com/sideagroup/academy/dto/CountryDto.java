package com.sideagroup.academy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountryDto {

    @Schema(description = "Local movie title")
    private String title;
    @Schema(description = "Region of movie release")
    private String region;
    @Schema(description = "Local language")
    private String language;

}
