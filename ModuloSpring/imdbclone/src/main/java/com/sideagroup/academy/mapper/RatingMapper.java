package com.sideagroup.academy.mapper;

import com.sideagroup.academy.dto.RatingDto;
import com.sideagroup.academy.model.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {

    public RatingDto toDto (Rating entity) {
        RatingDto dto = new RatingDto();
        //Qua andrà in Internal Error 500 se provo a cercare un film che ho inserito io senza dargli un rating, che sarà nullo
        dto.setAverageRating(entity.getAverageRating());
        dto.setNumVotes(entity.getNumVotes());
        return dto;
    }

    public Rating toEntity(RatingDto dto) {
        Rating entity = new Rating();
        entity.setAverageRating(dto.getAverageRating());
        entity.setNumVotes(dto.getNumVotes());
        return entity;
    }
}
