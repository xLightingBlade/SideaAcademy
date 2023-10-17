package com.sideagroup.academy.mapper;

import com.sideagroup.academy.dto.GetAllMoviesResponseDto;
import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    @Autowired  //stesso ragionamento, è dependency injection al posto di fare new MovieCelebrityMapper()
    private MovieCelebrityMapper movieCelebrityMapper;

    @Autowired
    private CountryMapper countryMapper;
    @Autowired
    private RatingMapper ratingMapper;

    //Anche qui, un oggetto del modello Movie diventa un Dto
    //withCast lo usiamo per dire se in risposta dobbiamo dare anche tutto il cast del film oppure solo il film
    public MovieDto toDto(Movie entity, boolean withCast, boolean withCountry) {
        MovieDto dto = new MovieDto();
        dto.setTitle(entity.getTitle());
        dto.setId(entity.getId());
        dto.setYear(entity.getYear());
        dto.setRunningTime(entity.getRuntimeMinutes());
        dto.setGenres(entity.getGenres());
        dto.setRating(ratingMapper.toDto(entity.getRating()));
        if (withCast)
            //Qua mi piglio i nomi delle celebrità associate ad un film, se richiesto
            dto.getCast().addAll(entity.getNames().stream().map(item -> movieCelebrityMapper.toDto(item)).toList());
        if(withCountry)
            dto.getCountries().addAll(entity.getCountries().stream().map(item -> countryMapper.toDto(item)).toList());

    return dto;
    }

    //Una mia chiamata get su tutti i film, mi restituirà un GetAllMoviesResponseDto che al suo interno
    //contiene un PaginationDto e una lista di MovieDto. Gli attributi di Pagination li prendo da Page
    //La lista dei MovieDto la compongo andando a prendere le entita Movie da Page e trasformandole
    public GetAllMoviesResponseDto toDto(Page<Movie> movies, int size) {
        GetAllMoviesResponseDto dto = new GetAllMoviesResponseDto();
        dto.getPagination().setCurrentPage(movies.getNumber());
        dto.getPagination().setTotalElements(movies.getTotalElements());
        dto.getPagination().setTotalPages(movies.getTotalPages());
        dto.getPagination().setPageSize(size);
        dto.getMovies().addAll(movies.getContent().stream().map(item -> toDto(item, false, false)).toList());
        return dto;
    }

    //Percorso inverso, da dto a entità
    public Movie toEntity(MovieDto dto) {
        Movie entity = new Movie();
        entity.setTitle(dto.getTitle());
        entity.setGenres(dto.getGenres());
        entity.setId(dto.getId());
        entity.setYear(dto.getYear());
        entity.setRuntimeMinutes(dto.getRunningTime());
        return entity;
    }

    //Prende i valori dal dto e li usa per aggiornare l'entità
    public void updateFromDto(Movie entity, MovieDto dto) {
        entity.setTitle(dto.getTitle());
        entity.setGenres(dto.getGenres());
        entity.setYear(dto.getYear());
        entity.setRuntimeMinutes(dto.getRunningTime());
    }
}
