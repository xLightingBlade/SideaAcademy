package com.esercitazioni.primaesercitazionemeglio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookDto {
    @Schema(description = "Book ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private int id;
    @Schema(description = "Book ISBN code", example = "1111111111111", requiredMode = Schema.RequiredMode.REQUIRED)
    private String isbn;
    @Schema(description = "Book title", example = "TitoloUno", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;
    @Schema(description = "Book author name", example = "AutoreUno")
    private String author;
    @Schema(description = "Book brief description", example = "Descrizione Uno")
    private String description;
}
