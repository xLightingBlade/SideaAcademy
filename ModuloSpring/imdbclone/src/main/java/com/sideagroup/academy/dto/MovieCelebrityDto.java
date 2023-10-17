package com.sideagroup.academy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieCelebrityDto {

    /* Tutte stringhe, a differenza del modello MovieCelebrity,come mai?
    Innanzitutto non mi interessa di che tipo è la chiave nel modello, non è quello che devo mostrare
    Nel Dto non troveremo mai nemmeno annotazioni come @entity o affini, è completamente sganciato dal database
     */
    private String celebrityName;
    private String celebrityId;
    private String movieTitle;
    private String movieId;
    private String category;
    private String characters;

}
