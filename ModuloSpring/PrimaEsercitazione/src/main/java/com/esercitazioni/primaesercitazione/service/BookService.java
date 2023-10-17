package com.esercitazioni.primaesercitazione.service;

import com.esercitazioni.primaesercitazione.dto.AllBooksDto;
import com.esercitazioni.primaesercitazione.dto.BookDto;

import java.util.Optional;

public interface BookService {

    public AllBooksDto getAllBooks(int page, int size, String orderBy, String reader);

    public Optional<BookDto> getBookByTitle(String title, String reader);
    public Optional<BookDto> getBookByDescription(String description, String reader);



    public void deleteBook(String isbn, String reader);

    public BookDto createBook(BookDto book);

    public Optional<BookDto> updateBook(String isbn, String reader, BookDto bookDto);
}
