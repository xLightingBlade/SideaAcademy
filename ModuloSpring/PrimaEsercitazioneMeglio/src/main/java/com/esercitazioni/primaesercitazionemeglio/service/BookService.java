package com.esercitazioni.primaesercitazionemeglio.service;

import com.esercitazioni.primaesercitazionemeglio.dto.AllBooksDto;
import com.esercitazioni.primaesercitazionemeglio.dto.BookDto;

import java.util.Optional;

public interface BookService {
    AllBooksDto getAllBooks(int page, int size, String orderBy);

    Optional<BookDto> getBookByTitle(String title);

    Optional<BookDto> getBookByDescription(String description);

    void deleteBookByIsbn(String isbn);

    BookDto createBook(BookDto bookDto);

    Optional<BookDto> updateBook(String isbn, BookDto bookDto);
}
