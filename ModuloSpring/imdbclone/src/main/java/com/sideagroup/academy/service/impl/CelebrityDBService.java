package com.sideagroup.academy.service.impl;

import com.sideagroup.academy.dto.CelebrityDto;
import com.sideagroup.academy.dto.GetAllCelebritiesResponseDto;
import com.sideagroup.academy.exception.GenericServiceException;
import com.sideagroup.academy.mapper.CelebrityMapper;
import com.sideagroup.academy.mapper.MovieCelebrityMapper;
import com.sideagroup.academy.model.Celebrity;
import com.sideagroup.academy.model.Movie;
import com.sideagroup.academy.repository.CelebrityRepository;
import com.sideagroup.academy.repository.MovieCelebrityRepository;
import com.sideagroup.academy.service.CelebrityService;
import com.sideagroup.academy.validator.CelebrityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("celebrityDBService")
public class CelebrityDBService implements CelebrityService {

    @Autowired
    private MovieCelebrityMapper movieCelebrityMapper;
    @Autowired
    private CelebrityMapper celebrityMapper;
    @Autowired
    private CelebrityRepository repo;
    @Autowired
    private MovieCelebrityRepository movieCelebrityRepository;
    @Autowired
    private CelebrityValidator celebrityValidator;


    @Override
    public GetAllCelebritiesResponseDto getAll(int page, int size, String orderBy, String name) {
        celebrityValidator.validateOrderBy(orderBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Celebrity> celebrities = name == null ? repo.findAll(pageable) :
                repo.findByPrimaryNameIgnoreCaseContaining(name, pageable);
        return celebrityMapper.allCelebritiesToDto(celebrities, size);
    }

    @Override
    public Optional<CelebrityDto> getById(String id) {
        Optional<Celebrity> result = repo.findById(id);
        if(!result.isEmpty()) {
            CelebrityDto dto = celebrityMapper.toDto(result.get(), true);
            return Optional.of(dto);
        }
        return Optional.empty();
    }

    //devo vedere se già esiste, se non esiste devo mappare il dto in entità e salvarlo
    @Override
    public CelebrityDto create(CelebrityDto celebrity) {
        Optional<Celebrity> result = repo.findById(celebrity.getId());
        if(!result.isEmpty())
            throw new GenericServiceException("Celebrity with id "+ celebrity.getId() + " already exists");
        Celebrity entity = repo.save(celebrityMapper.toEntity(celebrity));
        return celebrityMapper.toDto(entity, false);
    }

    @Override
    public Optional<CelebrityDto> update(String id, CelebrityDto celebrity) {
        Optional<Celebrity> opt = repo.findById(id);
        //non esiste, non faccio niente
        if (opt.isEmpty())
            return Optional.empty();

        //prendi l'entità, aggiorna l'entità usando i dati del dto, salva(insert), rimappa e restituisci il dto
        Celebrity entity = opt.get();
        celebrityMapper.updateFromDto(entity, celebrity);
        entity = repo.save(entity);
        return Optional.of(celebrityMapper.toDto(entity, false));
    }

    @Override
    public boolean deleteById(String id) {
        repo.deleteById(id);
        return true;
    }
}
