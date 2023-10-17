package com.sideagroup.academy.controller.api;

import com.sideagroup.academy.dto.CelebrityDto;
import com.sideagroup.academy.dto.DefaultErrorDto;
import com.sideagroup.academy.dto.GetAllCelebritiesResponseDto;
import com.sideagroup.academy.exception.GenericServiceException;
import com.sideagroup.academy.service.CelebrityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/celebrities")
@Tag(name = "Celebrities", description = "Celebrity management APIs")
public class CelebrityController {

    //anche qui, c'è una sola implementazione di celebrityService, non serve qualificarlo
    @Autowired
    private CelebrityService celebrityService;

    @Operation(summary = "Retrieves all celebrities",
            description = "Retrieves all celebrities without their movie appearances")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all celebrities"),
            @ApiResponse(responseCode = "400", description = "One or more invalid parameters",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @GetMapping
    public GetAllCelebritiesResponseDto getAll(
            @RequestParam(name="page", required=false, defaultValue="0")
            @Parameter(description = "Page number", example = "0") int page,
            @RequestParam(name="size", required=false, defaultValue="20")
            @Parameter(description = "Page size", example = "25") int size,
            @RequestParam(name="order_by", required=false, defaultValue="id")
            @Parameter(description = "Field used for sorting results", example = "id")String orderBy,
            @RequestParam(name="name", required=false)
            @Parameter(description = "Celebrity name or part of it, used for searching", example = "john") String name) {
        try {
            return celebrityService.getAll(page, size, orderBy, name);
        } catch(GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Retrieves a celebrity using his id, movies included",
            description = "Retrieves a celebritiy with all his/her movie appearances")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Celebrity successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Celebrity not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @GetMapping("{id}")
    public CelebrityDto getById(@PathVariable @Parameter(description = "Celebrity id") String id) {
        Optional<CelebrityDto> opt = celebrityService.getById(id);
        if(opt.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not found");
        return opt.get();
    }

    @Operation(summary = "Creates new celebrity",
            description = "Creates a new celebrity using the request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Celebrity successfully created"),
            @ApiResponse(responseCode = "400", description = "Celebrity already exists"),
            @ApiResponse(responseCode = "500", description = "Request body has missing or invalid fields",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CelebrityDto create(@RequestBody
                                   @Parameter(description = "Request body with celebrity info") CelebrityDto celebrity) {
        try {
            return celebrityService.create(celebrity);
        }catch(GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Updates a celebrity",
            description = "Updates a celebrity using the request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Celebrity successfully updated"),
            @ApiResponse(responseCode = "400", description = "Body has missing or invalid fields"),
            @ApiResponse(responseCode = "404", description = "Celebrity not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @PutMapping("{id}")
    public CelebrityDto update(@PathVariable @Parameter(description = "Celebrity id") String id,
                               @RequestBody @Parameter(description = "Request body with celebrity info")
                               CelebrityDto celebrity) {
        Optional<CelebrityDto> opt = celebrityService.update(id, celebrity);

        if(opt.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not present");

        return opt.get();
    }

    @Operation(summary = "Deletes a celebrity", description = "Deletes a celebrity. Whether it exists or not," +
            "same behaviour occurs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @Parameter(description = "Celebrity id") String id) {
        celebrityService.deleteById(id);
    }
}
