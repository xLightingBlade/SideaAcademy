import { Injectable } from "@angular/core";
import { AllMoviesDtoInterface, MovieInterface } from "../interfaces/movie-interface";
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
        return this._http.get<AllMoviesDtoInterface>(`${this._baseUrl}/movies?page=0&size=25&order_by=id`).pipe(
            map((item:AllMoviesDtoInterface) => {
            return item.movies;
        }))
    }

    getSingleMovie(selectedId:string|null):Observable<MovieInterface>{
        return this._http.get<MovieInterface>(`${this._baseUrl}/movies/${selectedId}`);
    }

    //TODO
    createMovie(movie:MovieInterface) {
        //this._http.post<MovieInterface>(`${this._baseUrl}/movies`, movie);
        this._initialLength+=1;
        movie.id = (this._initialLength).toString();
        this._movieList.push(movie);
        this._movieListSubject$.next(this._movieList);
    }

    //Per Update e Delete, come mostrare la lista aggiornata dopo aver fatto le richieste?
    updateMovie(movie:MovieInterface):Observable<MovieInterface>{
        console.log(movie.id);
        return this._http.put<MovieInterface>(`${this._baseUrl}/movies/${movie.id}`, movie);
    }

    deleteMovie(movieId:string):Observable<unknown>{
        return this._http.delete(`${this._baseUrl}/movies/${movieId}`);
    }

}