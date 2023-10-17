package com.esercitazioni.primaesercitazionemeglio.mapper;

import com.esercitazioni.primaesercitazionemeglio.dto.AllBookReadersDto;
import com.esercitazioni.primaesercitazionemeglio.dto.AllBooksDto;
import com.esercitazioni.primaesercitazionemeglio.dto.BookReaderDto;
import com.esercitazioni.primaesercitazionemeglio.models.BookReader;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class BookReaderMapper {

    public BookReaderDto toDto(BookReader entity) {
        BookReaderDto dto = new BookReaderDto();
        dto.setBookId(entity.getBook().getId());
        dto.setBookAuthor(entity.getBook().getAuthor());
        dto.setBookIsbn(entity.getBook().getIsbn());
        dto.setBookTitle(entity.getBook().getTitle());
        dto.setBookDescription(entity.getBook().getDescription());
        dto.setReaderName(entity.getReader().getName());
        dto.setReaderId(entity.getReader().getId());
        return dto;
    }

    public void updateFromDto(BookReaderDto association, BookReader associationEntity) {
        associationEntity.getBook().setIsbn(association.getBookIsbn());
        associationEntity.getBook().setAuthor(association.getBookAuthor());
        associationEntity.getBook().setTitle(association.getBookTitle());
        associationEntity.getBook().setDescription(association.getBookDescription());
    }

    public AllBookReadersDto allToDto(Page<BookReader> books, int size) {
        AllBookReadersDto allBookReaders = new AllBookReadersDto();
        allBookReaders.getPagination().setCurrentPage(books.getNumber());
        allBookReaders.getPagination().setPageSize(size);
        allBookReaders.getPagination().setTotalElements(books.getTotalElements());
        allBookReaders.getPagination().setTotalPages(books.getTotalPages());
        //this::toDto è una method reference, suggerita dall'ide
        allBookReaders.getBookReaders().addAll(books.getContent().stream().map(this::toDto).toList());
        return allBookReaders;
    }
}
