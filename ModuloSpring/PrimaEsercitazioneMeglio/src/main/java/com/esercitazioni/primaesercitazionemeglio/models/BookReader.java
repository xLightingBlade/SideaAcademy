package com.esercitazioni.primaesercitazionemeglio.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class BookReader {

    @EmbeddedId
    BookReaderKey id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    Book book;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("readerId")
    @JoinColumn(name = "reader_id")
    Reader reader;

    public BookReader(BookReaderKey key) {
        id = key;
    }

    public BookReader() {
        this(null);
    }
}
