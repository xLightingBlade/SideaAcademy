package com.esercitazioni.primaesercitazionemeglio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookReaderDto {

    @Schema(description = "Reader ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer readerId;
    @Schema(description = "Reader name", example = "ReaderUno", requiredMode = Schema.RequiredMode.REQUIRED)
    private String readerName;
    @Schema(description = "Book ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer bookId;
    @Schema(description = "Book ISBN code", example = "1111111111111", requiredMode = Schema.RequiredMode.REQUIRED)
    private String bookIsbn;
    @Schema(description = "Book title", example = "TitoloUno", requiredMode = Schema.RequiredMode.REQUIRED)
    private String bookTitle;
    @Schema(description = "Book author name", example = "AutoreUno")
    private String bookAuthor;
    @Schema(description = "Book description", example = "Descrizione Libro Uno")
    private String bookDescription;
}
