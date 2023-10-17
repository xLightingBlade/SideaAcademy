//I mapper, coloro che fanno da collante tra i dto e i modelli
package com.sideagroup.academy.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sideagroup.academy.dto.MovieCelebrityDto;
import com.sideagroup.academy.model.MovieCelebrity;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;


@Component //una annotation generica per poter usare autowired
public class MovieCelebrityMapper {

    //abbiamo a conti fatti così trasferito i dati dal modello (MovieCelebrity) al dto
    public MovieCelebrityDto toDto(MovieCelebrity entity) {
        MovieCelebrityDto dto = new MovieCelebrityDto();
        dto.setCategory(entity.getCategory());
        dto.setCharacters(normalizeCharacters(entity.getCharacters()));
        dto.setMovieTitle(entity.getMovie().getTitle());
        dto.setCelebrityName(entity.getCelebrity().getPrimaryName());
        dto.setCelebrityId(entity.getId().getCelebrityId());
        dto.setMovieId(entity.getId().getMovieId());
        return dto;
    }

    //abbellimenti al campo characters del json di risposta
    protected String normalizeCharacters(String characters) {
        if (characters == null)
            return null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<String> characterList = Arrays.asList(mapper.readValue(characters, String[].class));
            return characterList.toString().replace("[", "") .replace("]", "");
        } catch (JsonProcessingException e) { return characters; }
    }

}
