import { Injectable } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class MovieService{

    private _movieList:MovieInterface[] = [
        {
            id:"1",
            title:"movieOne",
            genres:"Action",
            year:2023,
            runtimeMinutes:120
        },
        {
            id:"2",
            title:"movieTwo",
            genres:"Dramatic",
            year:2013,
            runtimeMinutes:110
        },
        {
            id:"3",
            title:"movieThree",
            genres:"Comedy",
            year:2023,
            runtimeMinutes:120
        },
        {
            id:"4",
            title:"movieFour",
            genres:"Aiuto",
            year:1990,
            runtimeMinutes:90
        }
    ]

    private _initialLength = this._movieList.length;

    //Adesso ho reso privato il mio subject, altrimenti avrei potuto fare next() da ovunque. Ma adesso come vi accedo da fuori?
    private _movieListSubject$ = new Subject<MovieInterface[]>();
    //Creo un osservabile il cui unico scopo è di sola lettura, su di lui non posso farci i next(), che devono essere fatti al subject.
    $movieObservable$ = this._movieListSubject$.asObservable();

    constructor(){}
    

    getMovieList(){
        this._movieListSubject$.next(this._movieList);
    }

    getSingleMovie(selectedId:string|null):MovieInterface{
        const movie:MovieInterface | undefined = this._movieList.find(movie => movie.id == selectedId);
        if(movie) {
            return movie;
        }else {
            //Meglio mostrare un ion-toast e tornare indietro piuttosto che ritornare questo
            return {
                id:"Not Found",
                title:"Unavailable",
                genres:"Unavailable",
                year:NaN,
                runtimeMinutes:NaN
            }
        }
    }

    createMovie(movie:MovieInterface) {
        this._initialLength+=1;
        movie.id = (this._initialLength).toString();
        this._movieList.push(movie);
        this._movieListSubject$.next(this._movieList);
    }

    updateMovie(movie:MovieInterface){
        console.log(movie.id);
        const movieToUpdateIdx:number = this._getIndex(movie.id);
        if(movieToUpdateIdx != -1) {
            this._movieList[movieToUpdateIdx] = movie;
        }
        this._movieListSubject$.next(this._movieList);
    }

    deleteMovie(movieId:string){
        
        //si dovrebbe filtrare sul subject
        console.log(movieId);
        
        const movieToDeleteIdx:number = this._getIndex(movieId);
        if(movieToDeleteIdx != -1) {
            this._movieList.splice(movieToDeleteIdx, 1);
        }
        this._movieListSubject$.next(this._movieList);
        
    }

    private _getIndex(movieId:string):number {
        return this._movieList.findIndex((item:MovieInterface) => item.id == movieId)
    }

}