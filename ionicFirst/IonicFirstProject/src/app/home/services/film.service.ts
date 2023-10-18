import { Injectable } from "@angular/core";
import { filmsInterface } from "../../films/interfaces/filmsInterface";

@Injectable({
    providedIn : 'root' //vuol dire che il service è reso disponibile in tutte le rotte
})
//Questo è un service, ma occhio che non vuol dire che serve solo a fare chiamate ad un backend, tipo il service scritto NEL backend
//é un service, vuol dire che serve anche a creare funzioni da mettere a disposizione a più componenti, funzioni condivise.
export class FilmService{
    
    films : filmsInterface[] = [
        {
            name : "Star Wars III : La Vendetta dei Sith",
            year : 2005,
            vote : 10
        },
        {
            name : "L'ultimo Samurai",
            year : 2003,
            vote : 9
        },
        {
            name : "Si alza il vento",
            year : 2013,
            vote : 10
        },
        {
            name : "Blade Runner",
            year : 1982,
            vote : 8.5
        }
    ];

    getList() : filmsInterface[] {
        return this.films;
    }
}