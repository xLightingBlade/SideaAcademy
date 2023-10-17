package com.sideagroup.academy.mapper;

import com.sideagroup.academy.dto.CelebrityDto;
import com.sideagroup.academy.dto.GetAllCelebritiesResponseDto;
import com.sideagroup.academy.dto.GetAllMoviesResponseDto;
import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.model.Celebrity;
import com.sideagroup.academy.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class CelebrityMapper {

    @Autowired //mi serve anche qui per la relazione tra tabelle
    private MovieCelebrityMapper movieCelebrityMapper;

    //Da entity a Dto
    public CelebrityDto toDto(Celebrity entity, boolean withMovies) {
        CelebrityDto dto = new CelebrityDto();
        dto.setId(entity.getId());
        dto.setName(entity.getPrimaryName());
        dto.setBirthYear(entity.getBirthYear());
        dto.setDeathYear(entity.getDeathYear());
        if(!withMovies)
            return dto;
        dto.getMovies().addAll(entity.getTitles().stream().map(item -> movieCelebrityMapper.toDto(item)).toList());
        return dto;
    }

    public GetAllCelebritiesResponseDto allCelebritiesToDto (Page<Celebrity> celebrities, int size) {
        GetAllCelebritiesResponseDto dto = new GetAllCelebritiesResponseDto();
        dto.getPagination().setCurrentPage(celebrities.getNumber());
        dto.getPagination().setTotalElements(celebrities.getTotalElements());
        dto.getPagination().setTotalPages(celebrities.getTotalPages());
        dto.getPagination().setPageSize(size);
        dto.getCelebrities().addAll(celebrities.getContent().stream().map(item -> toDto(item, false)).toList());
        return dto;
    }


    //Percorso inverso, da dto a entità
    public Celebrity toEntity(CelebrityDto dto) {
        Celebrity entity = new Celebrity();
        entity.setId(dto.getId());
        entity.setPrimaryName(dto.getName());
        entity.setBirthYear(dto.getBirthYear());
        entity.setDeathYear(dto.getDeathYear());
        return entity;
    }

    //Prende i valori dal dto e li usa per aggiornare l'entità
    public void updateFromDto(Celebrity entity, CelebrityDto dto) {
        //entity.setId(dto.getId())  NO, Hibernate non sa gestire il cambio di un'id di un'entità
        entity.setPrimaryName(dto.getName());
        entity.setBirthYear(dto.getBirthYear());
        entity.setDeathYear(dto.getDeathYear());
    }
}
