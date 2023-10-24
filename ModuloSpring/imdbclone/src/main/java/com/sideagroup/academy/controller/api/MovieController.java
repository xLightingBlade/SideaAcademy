package com.sideagroup.academy.controller.api;

//Guardando anche agli import, è chiaro come il controller non sappia dell'esistenza dei service

import com.sideagroup.academy.dto.DefaultErrorDto;
import com.sideagroup.academy.dto.GetAllMoviesResponseDto;
import com.sideagroup.academy.dto.MovieCelebrityDto;
import com.sideagroup.academy.dto.MovieDto;
import com.sideagroup.academy.exception.GenericServiceException;
import com.sideagroup.academy.service.MovieService;
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

/*
(RestController)Serve a indicare che questo è un controller
Sempre secondo i principi di Inversion of Control, dato che
sarà spring poi a richiamare il controller quando serve, non noi
*/

//Il controller(web) per ogni richiesta chiama metodi del service, il service per effettuarle
//usa i metodi esposti dal repository. Il repository ottiene domain model, il mapper li trasforma in dto
//I dto vengono passati al web e restituiti. E anche il percorso inverso avviene, come in una post
@CrossOrigin(origins = "http://localhost:8100")
@RestController
/*
Quest'altra annotazione (RequestMapping)serve invece a dire che il controller in questione si attiva
quando arriva una richiesta sul path specificato
Anche qui, non richiamo io le classi e i metodi, vengono chiamati da soli
da SpringBoot quando arrivano determinate richieste su determinati path
 */
@RequestMapping("api/v1/movies")
@Tag(name = "Movies", description = "Movie management APIs")
public class MovieController {

    /* Questo è errato perchè il controller non deve manco sapere dove stanno i dati
    Deve solo ricevere richieste e restituire risposte
    Ricordando che Controller e Service si parlano con i DTO
     */
    //private List<MovieDto> movies = new ArrayList<>();


    /* Abbiamo detto che una classe non deve conoscere l'implementazione dei servizi che usa
    Qui invece stiamo violando questo principio, facendo questo new Classe(). Abbiamo cioè forte
    accoppiamento tra Web layer e Service layer
    Se volessi cambiare servizio, ogni volta devo fare modifiche al controller qui
    //private MovieMemoryService movieService = new MovieMemoryService();
    //private MovieDBService movieService = new MovieDBService();
    */

    /*Io qui semplicemente dico che faccio uso dell'interfaccia MovieService.
    Quale che sia la sua implementazione specifica da usare non è affar mio scriverlo.
    Devo fare dependency injection, dicendo a Spring quale deve usare
     */


    /*gli sto dicendo, ho bisogno di usare questa interfaccia MovieService. Dall'altro lato devo indicare quale
    /Vado sull'implementazione di MovieService che voglio e la marchio
    Però io di implementazioni di MovieService ne ho più di una, devo specificare quale usare
    */
    //@Qualifier("movieDbService") //gli dico di iniettare la dipendenza annotata come "memoryService"
    //Non mi serve più il qualifier, ho un solo servizio. Mantengo i commenti come storia
    @Autowired
    private MovieService movieService;


    @Operation(summary = "Retrieves all movies without their cast",
            description = "Retrieves all movies without their cast in a paginated way")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all movies"),
            @ApiResponse(responseCode = "400", description = "One or more invalid parameters",
            content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    //GETMapping: questo metodo viene chiamato a fronte di una richiesta GET
    @GetMapping
    public GetAllMoviesResponseDto getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0")
            @Parameter(description = "Page number", example = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20")
            @Parameter(description = "Page size", example = "25") int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "id")
            @Parameter(description = "Field used for sorting results", example = "id")String orderBy,
            @RequestParam(name = "title", required = false)
            @Parameter(description = "Movie title or part of it, used for searching", example = "star") String title) {
        try {
            return movieService.getAll(page, size, orderBy, title);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }


    @Operation(summary = "Retrieves a movie using his id, cast included",
            description = "Retrieves a movie with specified id and with cast")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Movie successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Movie not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @GetMapping("{id}")
    public MovieDto getById(@PathVariable @Parameter(description = "movie id", example = "tt0121766") String id) {
        Optional<MovieDto> opt = movieService.getById(id);

        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not found");
        }
        return opt.get();
    }


    @Operation(summary = "Creates new movie",
            description = "Creates a new movie using the request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Movie successfully created"),
            @ApiResponse(responseCode = "400", description = "Movie already exists"),
            @ApiResponse(responseCode = "500", description = "Request body has missing or invalid fields",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    //chiamato a seguito di una richiesta POST
    //RequestBody come parametro, sto dicendo che nel body della richiesta deve esserci un movie
    @PostMapping
    //responsestatus per indicare quale codice restituirà
    /* Un json mandato come body di questa richiesta viene serializzato, Spring
    gestisce poi il resto, usando le annotazioni
    */
    @ResponseStatus(HttpStatus.CREATED)
    public MovieDto create(@RequestBody @Parameter(description = "Request body containing movie info") MovieDto movie) {
        try {
            return movieService.create(movie);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Updates a movie",
            description = "Updates a movie using the request body")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Movie successfully updated"),
            @ApiResponse(responseCode = "400", description = "Body has missing or invalid fields"),
            @ApiResponse(responseCode = "404", description = "Movie not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @PutMapping("{id}")
    public MovieDto update(@PathVariable @Parameter(description = "Movie id") String id,
                           @RequestBody @Parameter(description = "Request body containing movie info") MovieDto movie) {
        Optional<MovieDto> opt = movieService.update(id, movie);

        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not found");
        }
        return opt.get();
    }

    @Operation(summary = "Deletes a movie", description = "Deletes a movie. Whether it exists or not," +
            "same behaviour occurs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    /* Notare come non viene lanciato un errore not found quando non viene trovato il film
    Questo perchè la delete è idempotente, tante volte fai la stessa richiesta delete avrai sempre la stessa risposta
    Stessa cosa l'update
     */
    public void deleteById(@PathVariable @Parameter(description = "Movie id") String id) {
        movieService.deleteById(id);
    }

    @Operation(summary = "Creates movie-celebrity association",
            description = "Creates a new association between an existing movie and an existing celebrity")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Association successfully created"),
            @ApiResponse(responseCode = "400", description = "Either movie or celebrity does not exist",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))
    })
    @PutMapping("{movieId}/celebrities/{celebrityId}")
    public MovieCelebrityDto associateCelebrity(
            @PathVariable @Parameter(description = "Movie id") String movieId,
            @PathVariable @Parameter(description = "Celebrity id") String celebrityId,
            @RequestBody @Parameter(description = "Request body containing movie info") MovieCelebrityDto body) {

        try {
            return movieService.associateCelebrity(movieId, celebrityId, body);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Deletes movie-celebrity association",
            description = "Deletes an association between a movie and a celebrity. Whether it exists or not," +
            "same behaviour occurs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200")
    })
    @DeleteMapping("{movieId}/celebrities/{celebrityId}")
    public void deleteMovieCelebrityAssociation(@PathVariable @Parameter(description = "Movie id") String movieId,
                                                @PathVariable @Parameter(description = "Celebrity id") String celebrityId) {

        movieService.deleteMovieCelebrityAssociation(movieId, celebrityId);
    }
}
