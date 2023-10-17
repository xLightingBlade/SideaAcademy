package com.esercitazioni.primaesercitazionemeglio.repositories;

import com.esercitazioni.primaesercitazionemeglio.models.BookReader;
import com.esercitazioni.primaesercitazionemeglio.models.BookReaderKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReaderRepository extends JpaRepository<BookReader, BookReaderKey> {
}
