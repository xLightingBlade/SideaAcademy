package com.esercitazioni.primaesercitazionemeglio.repositories;

import com.esercitazioni.primaesercitazionemeglio.models.Reader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReaderRepository extends JpaRepository<Reader, Integer> {
    public Page<Reader> findAllByNameEqualsIgnoreCase(String name, Pageable pageable);
    Optional<Reader> findByName(String name);

}
