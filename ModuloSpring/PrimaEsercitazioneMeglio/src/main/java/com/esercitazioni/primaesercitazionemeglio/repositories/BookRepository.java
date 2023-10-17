package com.esercitazioni.primaesercitazionemeglio.repositories;

import com.esercitazioni.primaesercitazionemeglio.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<Book> findByTitle(String title);

    Optional<Book> findByDescription(String description);

    void deleteByIsbn(String isbn);
}
