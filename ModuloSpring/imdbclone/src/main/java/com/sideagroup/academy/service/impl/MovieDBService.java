package com.sideagroup.academy.service.impl;

import com.sideagroup.academy.dto.GetAllMoviesResponseDto;
import com.sideagroup.academy.dto.MovieCelebrityDto;
import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.exception.GenericServiceException;
import com.sideagroup.academy.mapper.MovieCelebrityMapper;
import com.sideagroup.academy.mapper.MovieMapper;
import com.sideagroup.academy.mapper.RatingMapper;
import com.sideagroup.academy.model.*;
import com.sideagroup.academy.repository.CelebrityRepository;
import com.sideagroup.academy.repository.MovieCelebrityRepository;
import com.sideagroup.academy.repository.MovieRepository;
import com.sideagroup.academy.repository.RatingRepository;
import com.sideagroup.academy.service.MovieService;
import com.sideagroup.academy.validator.MovieValidator;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service("movieDbService")
public class MovieDBService implements MovieService {


    private static final Logger logger = LoggerFactory.getLogger(MovieDBService.class);

    @Autowired
    private MovieRepository repo;
    @Autowired
    private CelebrityRepository celebRepo;
    @Autowired
    private MovieCelebrityRepository movieCelebrityRepository;
    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private MovieMapper mapper;

    @Autowired
    private MovieCelebrityMapper movieCelebrityMapper;

    @Autowired
    private RatingMapper ratingMapper;

    @Autowired
    private MovieValidator validator;

    @Override
    public GetAllMoviesResponseDto getAll(int page, int size, String orderBy, String title) {
        //esempio di uso logger
        logger.info("getAll called");
        validator.validateQueryParams(orderBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Movie> movies = title == null ? repo.findAll(pageable) : repo.findByTitle("%" + title + "%", pageable);
        return mapper.toDto(movies, size);
    }


    @Override
    public Optional<MovieDto> getById(String id) {
        logger.info("getbyId called");
        //ricerca per id tramite le entità
        Optional<Movie> result = repo.findById(id);
        if (!result.isEmpty()) {
            //se c'è riscontro, mappa l'entità a dto e restituisci
            MovieDto dto = mapper.toDto(result.get(), true, true);
            return Optional.of(dto);
        }
        return Optional.empty();
    }


    @Override
    @Transactional   //meccanismo di transazione, non vogliamo avere creazioni fallite a metà
    public MovieDto create(MovieDto movie) {
        validator.validateCreateMovieRequest(movie);

        Optional<Movie> opt = repo.findById(movie.getId());
        if (!opt.isEmpty())
            throw new GenericServiceException("Movie with id " + movie.getId() + " already exists");
        //trasformo il dto in entità, lo salvo con save, cioè ci faccio una insert
        Movie movieEntity = mapper.toEntity(movie);
        movieEntity = repo.save(movieEntity); //prima mi salvo la tabella padre Movie
        //Sto bordello mi serve per settare il rating ad un nuovo film
        Rating rating = ratingMapper.toEntity(movie.getRating());
        rating.setMovie(movieEntity);
        rating = ratingRepository.save(rating);
        movieEntity.setRating(rating);
        /* Perchè rimappiamo l'entità che abbiamo appena creato per restituirla, e non restituiamo direttamente il dto?
        Perchè in altre situazioni potrei creare un'entità non passandogli campi come l'id, se sono auto incrementati.
        Senza il rimappamento da entità a dto non potrei recuperare l'id
         */

        return mapper.toDto(movieEntity, false, false);
    }

    @Override
    public Optional<MovieDto> update(String id, MovieDto movie) {
        logger.info("update called");
        //cerca tra i film per id
        Optional<Movie> opt = repo.findById(id);
        if (opt.isEmpty())
            return Optional.empty();
        //prendi l'entità, aggiorna l'entità usando i dati del dto, salva(insert), restituisci il dto
        Movie entity = opt.get();
        mapper.updateFromDto(entity, movie);
        entity = repo.save(entity);
        return Optional.of(mapper.toDto(entity, false, false));
    }

    @Override
    @Transactional
    public boolean deleteById(String id) {
        //prima di poter cancellare il film(padre) devo cancellare un suo figlio(rating, con cui ha una oneToOne)
        logger.info("delete called");
        Optional<Movie> movie = repo.findById(id);
        if (movie.isEmpty())
            return false;
        ratingRepository.deleteById(movie.get().getRating().getId());
        repo.deleteById(id);
        return true;
    }

    @Override
    public MovieCelebrityDto associateCelebrity(String movieId, String celebrityId, MovieCelebrityDto body) {
        //controllo esista il film
        Optional<Movie> movie = repo.findById(movieId);
        if (movie.isEmpty())
            throw new GenericServiceException("Movie with id " + movieId + " does not exist");

        //controllo esista la celebrità
        Optional<Celebrity> celebrity = celebRepo.findById(celebrityId);
        if (celebrity.isEmpty())
            throw new GenericServiceException("Celebrity with id " + movieId + " does not exist");

        //nuova chiave dell'associazione usando gli id
        MovieCelebrityKey key = new MovieCelebrityKey(celebrityId, movieId);
        Optional<MovieCelebrity> rel = movieCelebrityRepository.findById(key);
        //controllo che non esista già la relazione tra i due id
        if (!rel.isEmpty())
            return movieCelebrityMapper.toDto(rel.get());
            /*throw new GenericServiceException("Association between "
                    + movieId + " and " + celebrityId + " already exists");

                    Non lancio più l'eccezione, sennò non garantisco l'idempotenza
                    perchè se lancio due volte la stessa richiesta, una volta va e l'altra volta da errore*/

        //imposto gli attributi dell'associazione MovieCelebrity
        MovieCelebrity entity = new MovieCelebrity(key);
        entity.setCelebrity(celebrity.get());
        entity.setMovie(movie.get());
        entity.setCategory(body.getCategory());
        entity.setCharacters(body.getCharacters());
        entity = movieCelebrityRepository.save(entity);

        return movieCelebrityMapper.toDto(entity);
    }

    public void deleteMovieCelebrityAssociation(String movieId, String celebrityId) {
        MovieCelebrityKey key = new MovieCelebrityKey(celebrityId, movieId);
        movieCelebrityRepository.deleteById(key);
    }

}
