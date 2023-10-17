package com.sideagroup.academy.service;

import com.sideagroup.academy.dto.GetAllMoviesResponseDto;
import com.sideagroup.academy.dto.MovieCelebrityDto;
import com.sideagroup.academy.dto.MovieDto;

import java.util.Optional;

public interface MovieService {
    public GetAllMoviesResponseDto getAll(int page, int size, String orderBy, String title);

    public Optional<MovieDto> getById(String id);

    public MovieDto create(MovieDto movie);

    public Optional<MovieDto> update(String id, MovieDto movie);

    public MovieCelebrityDto associateCelebrity(String movieId, String celebrityId, MovieCelebrityDto body);

    public boolean deleteById(String id);

    void deleteMovieCelebrityAssociation(String movieId, String celebrityId);
}
