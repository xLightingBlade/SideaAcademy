package com.esercitazioni.primaesercitazionemeglio.service.serviceImplementation;

import com.esercitazioni.primaesercitazionemeglio.dto.AllBooksDto;
import com.esercitazioni.primaesercitazionemeglio.dto.BookDto;
import com.esercitazioni.primaesercitazionemeglio.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazionemeglio.mapper.BookMapper;
import com.esercitazioni.primaesercitazionemeglio.models.Book;
import com.esercitazioni.primaesercitazionemeglio.repositories.BookRepository;
import com.esercitazioni.primaesercitazionemeglio.service.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImplementation implements BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMapper bookMapper;


    @Override
    public AllBooksDto getAllBooks(int page, int size, String orderBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Book> books = bookRepository.findAll(pageable);
        return bookMapper.allToDto(books, size);
    }

    @Override
    public Optional<BookDto> getBookByTitle(String title) {
        Optional<Book> bookEntity = bookRepository.findByTitle(title);
        return bookEntity.map(book -> bookMapper.toDto(book));
    }

    @Override
    public Optional<BookDto> getBookByDescription(String description) {
        Optional<Book> bookEntity = bookRepository.findByDescription(description);
        return bookEntity.map(book -> bookMapper.toDto(book));
    }

    @Override
    @Transactional
    public void deleteBookByIsbn(String isbn) {
        bookRepository.deleteByIsbn(isbn);
    }

    @Override
    public BookDto createBook(BookDto bookDto) {
        Optional<Book> optBook = bookRepository.findById(bookDto.getId());
        if(optBook.isPresent())
            throw new GenericServiceException("Book already exists");

        Book bookEntity = bookRepository.save(bookMapper.fromDto(bookDto));
        return bookMapper.toDto(bookEntity);
    }

    @Override
    public Optional<BookDto> updateBook(String id, BookDto bookDto) {
        Optional<Book> optBookEntity = bookRepository.findById(Integer.valueOf(id));
        if(optBookEntity.isEmpty())
            return Optional.empty();
        Book bookEntity = optBookEntity.get();
        bookMapper.updateBook(bookDto, bookEntity);
        bookEntity = bookRepository.save(bookEntity);
        return Optional.of(bookMapper.toDto(bookEntity));
    }
}
