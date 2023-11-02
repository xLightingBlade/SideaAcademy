import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  MovieFormInterface,
  MovieInterface,
} from '../interfaces/movie-interface';
import { AllResponsesDto } from 'src/app/shared/interfaces/all-response-dto';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _baseUrl = '';
  constructor(private readonly _http: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  getMovieList(): Observable<MovieInterface[]> {
    return this._http
      .get<AllResponsesDto>(
        `${this._baseUrl}/movies?page=0&size=50&order_by=id`
      )
      .pipe(map(({ data }) => data));
  }

  getSingleMovie(selectedId: string | null): Observable<MovieInterface> {
    return this._http.get<MovieInterface>(
      `${this._baseUrl}/movies/${selectedId}`
    );
  }

  getMoviesByTitle(selectedTitle: string): Observable<MovieInterface[]> {
    return this._http
      .get<AllResponsesDto>(
        `${this._baseUrl}/movies?title=${selectedTitle}&page=0&size=50`
      )
      .pipe(map(({ data }) => data));
  }

  createMovie(movieForm: MovieFormInterface): Observable<MovieInterface> {
    const movie = this._formToDto(movieForm);
    return this._http.post<MovieInterface>(`${this._baseUrl}/movies`, movie);
  }

  updateMovie(movie: MovieInterface): Observable<MovieInterface> {
    console.log(movie.id);
    return this._http.put<MovieInterface>(
      `${this._baseUrl}/movies/${movie.id}`,
      movie
    );
  }

  deleteMovie(movieId: string): Observable<unknown> {
    return this._http.delete(`${this._baseUrl}/movies/${movieId}`);
  }

  private _formToDto(form: MovieFormInterface): MovieInterface {
    return {
      id: form.id,
      genres: form.genres,
      runningTime: form.runningTime,
      title: form.title,
      year: form.year,
      rating: {
        averageRating: form.averageRating,
        numVotes: form.numVotes,
      },
    };
  }
}
