package com.esercitazioni.primaesercitazionemeglio.service.serviceImplementation;

import com.esercitazioni.primaesercitazionemeglio.dto.*;
import com.esercitazioni.primaesercitazionemeglio.exceptions.GenericServiceException;
import com.esercitazioni.primaesercitazionemeglio.mapper.BookReaderMapper;
import com.esercitazioni.primaesercitazionemeglio.mapper.ReaderMapper;
import com.esercitazioni.primaesercitazionemeglio.models.Book;
import com.esercitazioni.primaesercitazionemeglio.models.BookReader;
import com.esercitazioni.primaesercitazionemeglio.models.BookReaderKey;
import com.esercitazioni.primaesercitazionemeglio.models.Reader;
import com.esercitazioni.primaesercitazionemeglio.repositories.BookReaderRepository;
import com.esercitazioni.primaesercitazionemeglio.repositories.BookRepository;
import com.esercitazioni.primaesercitazionemeglio.repositories.ReaderRepository;
import com.esercitazioni.primaesercitazionemeglio.service.ReaderService;
import com.esercitazioni.primaesercitazionemeglio.validators.OrderByValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReaderServiceImplementation implements ReaderService {

    @Autowired
    private ReaderRepository repo;
    @Autowired
    private BookRepository bookRepo;
    @Autowired
    private BookReaderRepository bookReaderRepo;

    @Autowired
    private ReaderMapper readerMapper;
    @Autowired
    private BookReaderMapper bookReaderMapper;

    @Autowired
    private OrderByValidator orderByValidator;

    @Override
    public AllReadersDto getAllReadersInfo(int page, int size, String orderBy, String name) {
        orderByValidator.validateOrderByParameter(orderBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Reader> readers = name == null? repo.findAll(pageable) : repo.findAllByNameEqualsIgnoreCase(name, pageable);
        return readerMapper.allToDto(readers, size);
    }

    @Override
    public AllBookReadersDto getAllReaderBooks(int page, int size, String orderBy, String bookTitle,
                                         String bookDescription, String readerId) {

        orderByValidator.validateBooksOrderByParameter(orderBy);
        Optional<Reader> optReader = repo.findById(Integer.valueOf(readerId));
        if(optReader.isEmpty())
            throw new GenericServiceException("Reader does not exist");

        List<BookReader> bookList = optReader.get().getBooks().stream().toList();
        if(bookTitle == null) {
            if(bookDescription == null) {
                throw new GenericServiceException("Insert a valid search parameter");
            } else {
                bookList = bookList.stream()
                        .filter(item -> item.getBook().getDescription().equalsIgnoreCase(bookDescription)).toList();
            }
        } else {
            bookList = bookList.stream()
                    .filter(item -> item.getBook().getTitle().equalsIgnoreCase(bookTitle)).toList();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), bookList.size());
        List<BookReader> bookPageContent = bookList.subList(start, end);
        Page<BookReader> books = new PageImpl<>(bookPageContent, pageable, bookList.size());
        return bookReaderMapper.allToDto(books, size);

    }

    @Override
    public Optional<ReaderDto> getReaderById(String id) {
        Optional<Reader> optReader = repo.findById(Integer.valueOf(id));
        return optReader.map(reader -> readerMapper.toDto(reader, true));
    }

    @Override
    public ReaderDto createReader(ReaderDto reader) {
        Optional<Reader> optReader = repo.findByName(reader.getName());
        if(optReader.isPresent())
            throw new GenericServiceException("Reader already exists");
        Reader readerEntity = repo.save(readerMapper.toEntity(reader));
        return readerMapper.toDto(readerEntity, true);
    }

    @Override
    public Optional<ReaderDto> updateReader(String id, ReaderDto reader) {
        Optional<Reader> optReader = repo.findById(Integer.valueOf(id));
        if(optReader.isEmpty()) {
            return Optional.empty();
        }
        Reader readerEntity = optReader.get();
        readerMapper.updateFromDto(reader, readerEntity);
        readerEntity = repo.save(readerEntity);
        return Optional.of(readerMapper.toDto(readerEntity, true));
    }

    @Override
    public BookReaderDto updateBookReaderAssociation(String readerId, String bookId, BookReaderDto association) {
        Optional<Book> optBook = bookRepo.findById(Integer.valueOf(bookId));
        if(optBook.isEmpty())
            throw new GenericServiceException("Book does not exist");
        Optional<Reader> optReader = repo.findById(Integer.valueOf(readerId));
        if(optReader.isEmpty())
            throw new GenericServiceException("Reader does not exist");
        BookReaderKey key = new BookReaderKey(Integer.valueOf(bookId), Integer.valueOf(readerId));
        Optional<BookReader> optRelationship = bookReaderRepo.findById(key);
        if(optRelationship.isEmpty())
            throw new GenericServiceException("Association does not exist");

        //Quello che vorrei fare qua è, a partire da BookReader, accedere al Reader, prendergli i libri e modificarne uno
        //Al momento invece una modifica di un libro in un'associazione libro-lettore modifica anche il libro in tabella.
        BookReader associationEntity = optRelationship.get();
        bookReaderMapper.updateFromDto(association, associationEntity);
        associationEntity = bookReaderRepo.save(associationEntity);
        return bookReaderMapper.toDto(associationEntity);
    }

    @Override
    public void deleteReader(String id) {
        repo.deleteById(Integer.valueOf(id));
    }

    @Override
    public BookReaderDto associateBookWithReader(String bookId, String readerId) {
        Optional<Book> optBook = bookRepo.findById(Integer.valueOf(bookId));
        if(optBook.isEmpty())
            throw new GenericServiceException("Book does not exist");
        Optional<Reader> optReader = repo.findById(Integer.valueOf(readerId));
        if(optReader.isEmpty())
            throw new GenericServiceException("Reader does not exist");

        BookReaderKey key = new BookReaderKey(Integer.valueOf(bookId), Integer.valueOf(readerId));
        Optional<BookReader> optRelationship = bookReaderRepo.findById(key);
        if(optRelationship.isPresent())
            throw new GenericServiceException("Association already exists");
        BookReader association = new BookReader(key);
        association.setBook(optBook.get());
        association.setReader(optReader.get());
        association = bookReaderRepo.save(association);
        return bookReaderMapper.toDto(association);
    }

    @Override
    public void deleteBookFromReader(String bookId, String readerId) {
        BookReaderKey key = new BookReaderKey(Integer.valueOf(bookId), Integer.valueOf(readerId));
        bookReaderRepo.deleteById(key);
    }

}
