package com.esercitazioni.primaesercitazionemeglio.mapper;

import com.esercitazioni.primaesercitazionemeglio.dto.AllReadersDto;
import com.esercitazioni.primaesercitazionemeglio.dto.ReaderDto;
import com.esercitazioni.primaesercitazionemeglio.models.Reader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class ReaderMapper {

    @Autowired
    private BookReaderMapper bookReaderMapper;
    public ReaderDto toDto(Reader readerEntity, boolean withBooks) {
        ReaderDto dto = new ReaderDto();
        dto.setId(readerEntity.getId());
        dto.setName(readerEntity.getName());
        if(withBooks)
            dto.getBooks().addAll(readerEntity.getBooks().stream().map(item -> bookReaderMapper.toDto(item)).toList());
        return dto;
    }

    public AllReadersDto allToDto(Page<Reader> readers, int size) {
        AllReadersDto allReadersDto = new AllReadersDto();
        allReadersDto.getPagination().setCurrentPage(readers.getNumber());
        allReadersDto.getPagination().setTotalElements(readers.getTotalElements());
        allReadersDto.getPagination().setPageSize(size);
        allReadersDto.getPagination().setTotalPages(readers.getTotalPages());
        allReadersDto.getReaders().addAll(readers.getContent().stream().map(item -> this.toDto(item, false)).toList());
        return allReadersDto;
    }

    public Reader toEntity(ReaderDto reader) {
        Reader readerEntity = new Reader();
        readerEntity.setId(reader.getId());
        readerEntity.setName(reader.getName());
        return readerEntity;
    }

    public void updateFromDto(ReaderDto reader, Reader readerEntity) {
        readerEntity.setName(reader.getName());
    }
}
