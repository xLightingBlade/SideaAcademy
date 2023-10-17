package com.esercitazioni.primaesercitazionemeglio.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
public class BookReaderKey implements Serializable {

    @Column(name = "book_id")
    private Integer bookId;
    @Column(name = "reader_id")
    private Integer readerId;

    public BookReaderKey(Integer bookId, Integer readerId) {
        this.bookId = bookId;
        this.readerId = readerId;
    }

    public BookReaderKey() {
        this(null, null);
    }
}
