package com.esercitazioni.primaesercitazionemeglio.service;

import com.esercitazioni.primaesercitazionemeglio.dto.*;

import java.util.Optional;

public interface ReaderService {

    AllReadersDto getAllReadersInfo(int page, int size, String orderBy, String name);

    Optional<ReaderDto> getReaderById(String id);

    ReaderDto createReader(ReaderDto reader);

    Optional<ReaderDto> updateReader(String id, ReaderDto reader);

    void deleteReader(String id);

    BookReaderDto associateBookWithReader(String bookId, String readerId);

    void deleteBookFromReader(String bookId, String readerId);

    BookReaderDto updateBookReaderAssociation(String readerId, String bookId, BookReaderDto association);

    AllBookReadersDto getAllReaderBooks(int page, int size, String orderBy, String bookTitle, String bookDescription,
                                            String readerId);
}
