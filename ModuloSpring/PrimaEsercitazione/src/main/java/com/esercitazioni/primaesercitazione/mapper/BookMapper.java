package com.esercitazioni.primaesercitazione.mapper;

import com.esercitazioni.primaesercitazione.dto.AllBooksDto;
import com.esercitazioni.primaesercitazione.dto.BookDto;
import com.esercitazioni.primaesercitazione.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    public BookDto toDto(Book bookEntity) {
        BookDto bookDto = new BookDto();
        bookDto.setId(bookEntity.getId());
        bookDto.setAuthor(bookEntity.getAuthor());
        bookDto.setIsbn(bookEntity.getIsbn());
        bookDto.setTitle(bookEntity.getTitle());
        bookDto.setDescription(bookEntity.getDescription());
        bookDto.setReader(bookEntity.getReader());
        return bookDto;
    }

    public Book fromDto(BookDto bookDto) {
        Book bookEntity = new Book();
        bookEntity.setAuthor(bookDto.getAuthor());
        bookEntity.setReader(bookDto.getReader());
        bookEntity.setIsbn(bookDto.getIsbn());
        bookEntity.setTitle(bookDto.getTitle());
        bookEntity.setDescription(bookDto.getDescription());
        return bookEntity;
    }

    public AllBooksDto allToDto(Page<Book> books, int size) {
        AllBooksDto allBooks = new AllBooksDto();
        allBooks.getPagination().setCurrentPage(books.getNumber());
        allBooks.getPagination().setPageSize(size);
        allBooks.getPagination().setTotalElements(books.getTotalElements());
        allBooks.getPagination().setTotalPages(books.getTotalPages());
        //this::toDto è una method reference, suggerita dall'ide
        allBooks.getBooks().addAll(books.getContent().stream().map(this::toDto).toList());
        return allBooks;
    }

    public void updateBook(BookDto bookDto, Book bookEntity) {
        bookEntity.setAuthor(bookDto.getAuthor());
        bookEntity.setDescription(bookDto.getDescription());
        bookEntity.setTitle(bookDto.getTitle());
        bookEntity.setIsbn(bookDto.getIsbn());
    }
}
