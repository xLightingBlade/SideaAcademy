package com.sideagroup.academy.repository;

import com.sideagroup.academy.model.Celebrity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CelebrityRepository extends JpaRepository<Celebrity, String> {

    //Un metodo per ottenere una pagina di attori che hanno un certo nome o parte di quel nome
    public Page<Celebrity> findByPrimaryNameIgnoreCaseContaining(String name, Pageable pageable);
}
