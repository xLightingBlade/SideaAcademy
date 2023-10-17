package com.esercitazioni.primaesercitazionemeglio.apicontroller;

import com.esercitazioni.primaesercitazionemeglio.dto.AllBooksDto;
import com.esercitazioni.primaesercitazionemeglio.dto.BookDto;
import com.esercitazioni.primaesercitazionemeglio.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazionemeglio.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("api/bookreaderservice/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public AllBooksDto getAllBooks(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20")int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "id")String orderBy) {
        return bookService.getAllBooks(page, size, orderBy);
    }

    @GetMapping("/byTitle/{title}")
    public BookDto getBookByTitle(@PathVariable String title) {
        Optional<BookDto> optBook = bookService.getBookByTitle(title);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book not found");
        return optBook.get();
    }

    @GetMapping("/byDesc/{description}")
    //TODO : ricerca non per descrizione precisa precisa ma per pezzetti
    public BookDto getBookByDescription(@PathVariable String description) {
        Optional<BookDto> optBook = bookService.getBookByDescription(description);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book not found");
        return optBook.get();
    }

    @DeleteMapping("/delete/{isbn}")
    public void deleteBook(@PathVariable String isbn) {
        bookService.deleteBookByIsbn(isbn);
    }

    @PostMapping
    public BookDto createBook(@RequestBody BookDto bookDto) {
        try {
            return bookService.createBook(bookDto);
        }catch(GenericServiceException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @PutMapping("update/{isbn}")
    public BookDto updateBook(@PathVariable String isbn,
                              @RequestBody BookDto bookDto) {
        Optional<BookDto> optBook = bookService.updateBook(isbn, bookDto);
        if(optBook.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "book does not exist");
        return optBook.get();
    }
}
