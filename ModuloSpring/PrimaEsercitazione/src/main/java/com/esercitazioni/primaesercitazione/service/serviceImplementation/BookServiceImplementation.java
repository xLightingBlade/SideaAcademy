package com.esercitazioni.primaesercitazione.service.serviceImplementation;

import com.esercitazioni.primaesercitazione.dto.AllBooksDto;
import com.esercitazioni.primaesercitazione.dto.BookDto;
import com.esercitazioni.primaesercitazione.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazione.mapper.BookMapper;
import com.esercitazioni.primaesercitazione.models.Book;
import com.esercitazioni.primaesercitazione.repositories.BookRepository;
import com.esercitazioni.primaesercitazione.service.BookService;
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
    public AllBooksDto getAllBooks(int page, int size, String orderBy, String reader) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Book> books = bookRepository.findAllByReader(pageable,reader);
        return bookMapper.allToDto(books, size);
    }

    //Per entrambi i metodi, cercare se esiste un modo per usare un Iterable che sia comunque opzionale
    @Override
    public Optional<BookDto> getBookByTitle(String title, String reader) {
        Optional<Book> bookEntity = bookRepository.findByTitle(title,reader);
        return bookEntity.map(book -> bookMapper.toDto(book));
    }

    @Override
    public Optional<BookDto> getBookByDescription(String description, String reader) {
        Optional<Book> bookEntity = bookRepository.findByDescription(description,reader);
        return bookEntity.map(book -> bookMapper.toDto(book));
    }

    @Override
    @Transactional
    public void deleteBook(String isbn, String reader) {
        bookRepository.deleteBookByReaderEqualsIgnoreCaseAndIsbnEquals(reader, isbn);
    }

    @Override
    @Transactional
    public BookDto createBook(BookDto book) {
        Optional<Book> optBook = bookRepository.findByReaderAndIsbn(book.getReader(), book.getIsbn());
        if(optBook.isPresent())
            throw new GenericServiceException("Book already exists");

        Book bookEntity = bookMapper.fromDto(book);
        bookEntity = bookRepository.save(bookEntity);
        return bookMapper.toDto(bookEntity);
    }

    @Override
    @Transactional
    public Optional<BookDto> updateBook(String isbn, String reader, BookDto bookDto) {
        Optional<Book> optBookEntity = bookRepository.findByReaderAndIsbn(reader, isbn);
        if(optBookEntity.isEmpty())
            return Optional.empty();
        Book bookEntity = optBookEntity.get();
        bookMapper.updateBook(bookDto, bookEntity);
        bookEntity = bookRepository.save(bookEntity);
        return Optional.of(bookMapper.toDto(bookEntity));
    }
}
