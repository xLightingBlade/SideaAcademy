package com.sideagroup.academy.repository;

import com.sideagroup.academy.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


//Sto creando una repository, per la tabella/oggetto Movie, che ha una chiave di tipo String
@Repository
public interface MovieRepository  extends JpaRepository<Movie, String> {
    //SpringDataJPA mi consente di definire dei metodi, seguendo regole sintattiche
    //che automaticamente generano query in base a parametri che voglio io, senza doverli implementare.
    //JPA capisce cosa voglio trovare, in base al nome del metodo e al tipo di ritorno, e fa tutto lui

    //Manco servirebbe qua la @query, visto che findByTitle verrebbe autocreata da JPA
    @Query("select m from Movie m where upper(m.title) like upper(:title)")
    public Page<Movie> findByTitle(@Param("title") String title, Pageable pageable);
}
