package com.esercitazioni.primaesercitazione.repositories;

import com.esercitazioni.primaesercitazione.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b where upper(b.title) like upper(:title) and upper(b.reader) like upper(:reader)")
    public Optional<Book> findByTitle(String title, String reader);

    @Query("select b from Book b where upper(b.description) like upper(:description)" +
            " and upper(b.reader) like upper(:reader)")
    public Optional<Book> findByDescription(String description, String reader);

    @Query("select b from Book b where upper(b.reader) like upper(:reader) and b.isbn like :isbn")
    public Optional<Book> findByReaderAndIsbn(String reader, String isbn);

    public void deleteBookByReaderEqualsIgnoreCaseAndIsbnEquals(String reader, String isbn);

    @Query("select b from Book b where upper(b.reader) like upper(:reader)")
    Page<Book> findAllByReader(Pageable pageable, String reader);
}
