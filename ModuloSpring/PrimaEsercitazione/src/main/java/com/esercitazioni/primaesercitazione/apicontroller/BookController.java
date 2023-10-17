package com.esercitazioni.primaesercitazione.apicontroller;

import com.esercitazioni.primaesercitazione.dto.AllBooksDto;
import com.esercitazioni.primaesercitazione.dto.BookDto;
import com.esercitazioni.primaesercitazione.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazione.service.BookService;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

/*Cosa voglio che faccia la mia applicazione: per ogni utente reader, memorizzare una lista di libri
con le loro info(isbn, title,author, description). Il reader immagino sia incluso nelle info del libro
non avendo visto meccanismi di autenticazione/profili utente
Abbiamo solo libri per ora, quindi un solo controller
Le operazioni sui libri sono di ricerca per titolo o per descrizione(o parti degli stessi), creazione e rimozione,
elenco di tutti i libri e aggiornamento. Classico crud. Unico vincolo: ogni reader vede solo i propri libri
Questo credo implicherà la scrittura di qualche piccola logica di business a livello service(controllo campo reader)
 */
@RestController
@RequestMapping("api/v1/books")
public class BookController {

    @Autowired
    private BookService bookService;

    //Riutilizzo i concetti di paginazione per mostrare meglio i risultati
    @GetMapping
    public AllBooksDto getAllBooks(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20")int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "id")String orderBy,
            @RequestParam(name = "reader")String reader) {
        return bookService.getAllBooks(page, size, orderBy, reader);
    }


    @GetMapping("/byTitle/{title}")
    public BookDto getBookByTitle(@PathVariable String title,
                                  @RequestParam(name = "reader")String reader) {
        Optional<BookDto> optBook = bookService.getBookByTitle(title, reader);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book not found");
        return optBook.get();
    }

    @GetMapping("/byDesc/{description}")
    public BookDto getBookByDescription(@PathVariable String description,
                                        @RequestParam(name = "reader")String reader) {
        Optional<BookDto> optBook = bookService.getBookByDescription(description, reader);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book not found");
        return optBook.get();
    }

    @DeleteMapping("{isbn}")
    public void deleteBook(@PathVariable String isbn, @RequestParam(name ="reader") String reader) {
        bookService.deleteBook(isbn, reader);
    }

    @PostMapping
    public BookDto createBook(@RequestBody BookDto bookDto) {
        try {
            return bookService.createBook(bookDto);
        }catch(GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @PutMapping("{reader}/{isbn}")
    public BookDto updateBook(@PathVariable String reader, @PathVariable String isbn,
                              @RequestBody BookDto bookDto) {
        Optional<BookDto> optBook = bookService.updateBook(isbn, reader, bookDto);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book does not exist");
        return optBook.get();
    }
}
