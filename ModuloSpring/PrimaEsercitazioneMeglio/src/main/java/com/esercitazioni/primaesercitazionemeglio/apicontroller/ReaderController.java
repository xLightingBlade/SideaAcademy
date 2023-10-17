package com.esercitazioni.primaesercitazionemeglio.apicontroller;

import com.esercitazioni.primaesercitazionemeglio.dto.*;
import com.esercitazioni.primaesercitazionemeglio.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazionemeglio.models.Book;
import com.esercitazioni.primaesercitazionemeglio.service.ReaderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@RestController
@RequestMapping("api/bookreaderservice/readers")
@Tag(name = "Books and Readers", description = "A RESTful API to manage readers and their books")
public class ReaderController {

    @Autowired
    private ReaderService readerService;

    //Al momento non vengono validati i parametri di order
    @Operation(summary = "Retrieves all readers", description = "Retrieves all readers along with their basic " +
            "information. Their book lists will not be retrieved")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Readers successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Wrong URL")
    })
    @GetMapping
    public AllReadersDto getAllReaders(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20") int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "id") String orderBy,
            @RequestParam(name = "name", required = false) String readerName) {

        try {
            return readerService.getAllReadersInfo(page, size, orderBy, readerName);
        }catch (GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @Operation(summary = "Retrieves all readers and books", description = "Retrieves all books of a specified reader that" +
            " match the search parameter. Books can be searched by using either a title or a description")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reader successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Wrong URL"),
            @ApiResponse(responseCode = "400", description = "Bad request: specify at least one search parameter")
    })
    @GetMapping("{readerId}/findBooks")
    public AllBookReadersDto getAllReaderBooks(
            @PathVariable String readerId,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20") int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "title") String orderBy,
            @RequestParam(name = "title", required = false) String bookTitle,
            @RequestParam(name = "description", required = false) String bookDescription) {

        try {
            return readerService.getAllReaderBooks(page, size, orderBy, bookTitle, bookDescription, readerId);
        } catch (GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }


    @Operation(summary = "Retrieves a reader", description = "Retrieves a reader and his book list, using the reader's" +
            " id as a path variable")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reader successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Not Found: Reader does not exist")
    })
    @GetMapping("{id}")
    public ReaderDto getReaderById(@PathVariable String id) {
        Optional<ReaderDto> optReader = readerService.getReaderById(id);
        if (optReader.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "reader not found");
        return optReader.get();
    }


    @Operation(summary = "Creates a new reader", description = "Creates a new reader using the information from the " +
            "request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Reader successfully created"),
            @ApiResponse(responseCode = "404", description = "Wrong URL")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    //TODO : aggiungere un vincolo di unique, magari aggiungendo qualche attributo ai reader
    public ReaderDto createReader(@RequestBody ReaderDto readerDto) {
        try {
            return readerService.createReader(readerDto);
        } catch (GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @Operation(summary = "Updates a reader", description = "Updates a reader using the information from the " +
            "request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reader successfully updated"),
            @ApiResponse(responseCode = "404", description = "Not Found: Reader does not exist")
    })
    @PutMapping("{id}")
    public ReaderDto updateReader(@PathVariable String id, @RequestBody ReaderDto readerDto) {
        Optional<ReaderDto> optionalReaderDto = readerService.updateReader(id, readerDto);
        if (optionalReaderDto.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return optionalReaderDto.get();
    }

    @Operation(summary = "Adds a book to a reader", description = "Adds a new association between the specified reader" +
            " and the specified book. Book list for that reader is now updated.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Association successfully created"),
            @ApiResponse(responseCode = "400", description = "Bad Request: Association between book and reader " +
                    "already exists"),
            @ApiResponse(responseCode = "404", description = "Not Found: reader or book does not exist")
    })
    @PutMapping("{readerId}/addNewBook/{bookId}")
    public BookReaderDto addNewBookToReader(@PathVariable String readerId,
                                            @PathVariable String bookId) {

        try {
            return readerService.associateBookWithReader(bookId, readerId);
        } catch (GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @Operation(summary = "Updates a reader's book", description = "Updates the association between the specified reader" +
            " and the specified book.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Association successfully updated"),
            @ApiResponse(responseCode = "400", description = "Bad Request: Either book, reader" +
                    " or association does not exist"),
            @ApiResponse(responseCode = "404", description = "Wrong URL")
    })
    @PutMapping("{readerId}/updateBookInfo/{bookId}")
    //TODO : Ok, però mi sta modificando il libro in generale(dalla tabella libri) anzichè solo il libro del reader
    public BookReaderDto updateReaderBook(@PathVariable String readerId,
                                          @PathVariable String bookId,
                                          @RequestBody BookReaderDto association) {

        try {
            return readerService.updateBookReaderAssociation(readerId, bookId, association);
        } catch (GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @Operation(summary = "Deletes a reader", description = "Deletes specified reader along with his book list")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reader successfully deleted")})
    @DeleteMapping("{id}")
    public void deleteReader(@PathVariable String id) {
        readerService.deleteReader(id);
    }

    @Operation(summary = "Deletes a reader's book", description = "Deletes specified book from the reader's book list")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book successfully deleted")})
    @DeleteMapping("{readerId}/removeBook/{bookId}")
    public void deleteBookFromReader(@PathVariable String readerId,
                                     @PathVariable String bookId) {

        readerService.deleteBookFromReader(bookId, readerId);
    }
}
