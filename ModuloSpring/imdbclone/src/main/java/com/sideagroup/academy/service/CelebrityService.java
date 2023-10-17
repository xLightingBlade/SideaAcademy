package com.sideagroup.academy.service;

import com.sideagroup.academy.dto.CelebrityDto;
import com.sideagroup.academy.dto.GetAllCelebritiesResponseDto;
import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.model.Celebrity;

import java.util.Optional;

public interface CelebrityService {

    public GetAllCelebritiesResponseDto getAll(int page, int size, String orderBy, String name);


    public Optional<CelebrityDto> getById(String id);


    public CelebrityDto create(CelebrityDto celebrity);

    public Optional<CelebrityDto> update(String id, CelebrityDto celebrity);

    public boolean deleteById(String id);
}
