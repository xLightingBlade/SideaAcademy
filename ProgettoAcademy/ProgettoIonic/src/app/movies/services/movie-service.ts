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
    constructor(private readonly _http:HttpClient){
        this._baseUrl = environment.baseUrl;
    }

    getMovieList():Observable<MovieInterface[]> {
        return this._http.get<AllMoviesDtoInterface>(`${this._baseUrl}/movies?page=0&size=25&order_by=id`).pipe(
            map((item:AllMoviesDtoInterface) => {
            return item.movies;
        }))
    }

    getSingleMovie(selectedId:string|null):Observable<MovieInterface>{
        return this._http.get<MovieInterface>(`${this._baseUrl}/movies/${selectedId}`);
    }


    createMovie(movie:MovieInterface):Observable<MovieInterface> {
        movie.rating = {
            averageRating :0,
            numVotes:0,
        }
        return this._http.post<MovieInterface>(`${this._baseUrl}/movies`, movie);
    }

    updateMovie(movie:MovieInterface):Observable<MovieInterface>{
        console.log(movie.id);
        return this._http.put<MovieInterface>(`${this._baseUrl}/movies/${movie.id}`, movie);
    }

    deleteMovie(movieId:string):Observable<unknown>{
        return this._http.delete(`${this._baseUrl}/movies/${movieId}`);
    }

}