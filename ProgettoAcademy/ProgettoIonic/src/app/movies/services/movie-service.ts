import { Injectable } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { BehaviorSubject, Observable, Subject, map } from "rxjs";
import {HttpClient} from "@angular/common/http"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class MovieService{
    private _baseUrl = "";
    private _movieList:MovieInterface[] = [];

    private _initialLength = this._movieList.length;


    constructor(private readonly _http:HttpClient){
        this._baseUrl = environment.baseUrl;
    }
    
    //Adesso ho reso privato il mio subject, altrimenti avrei potuto fare next() da ovunque. Ma adesso come vi accedo da fuori?
    private _movieListSubject$ = new Subject<MovieInterface[]>();
    //Creo un osservabile il cui unico scopo è di sola lettura, su di lui non posso farci i next(), che devono essere fatti al subject.
    $movieObservable$ = this._movieListSubject$.asObservable();

    getMovieList():Observable<MovieInterface[]> {
        //TODO creare interfaccia corretta, togliere quell'any ASAP
        return this._http.get<MovieInterface[]>(`${this._baseUrl}/movies?page=0&size=25&order_by=id`).pipe(map((item:any) => {
            return item.movies;
        }))
        //this._movieListSubject$.next(this._movieList);
    }

    getSingleMovie(selectedId:string|null):Observable<MovieInterface>{
        return this._http.get<MovieInterface>(`${this._baseUrl}/movies/${selectedId}`);
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

    totalFilm():number {
        return this._movieList.length;
    }

}