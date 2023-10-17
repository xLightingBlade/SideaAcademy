package com.sideagroup.academy.validator;

import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.exception.GenericServiceException;
import org.springframework.stereotype.Component;

@Component
public class MovieValidator {

    public void validateQueryParams(String orderBy) {
        if (!"id".equals(orderBy) &&
                !"title".equals(orderBy) &&
                !"year".equals(orderBy)) {
            throw new GenericServiceException("Invalid Sort field '" + orderBy + "'. Valid values are: [id, title, year]");
        }
    }

    public void validateCreateMovieRequest(MovieDto movieDto) {
        if(movieDto.getRating() == null)
            throw new GenericServiceException("Missing field 'Rating' ");
    }
}
