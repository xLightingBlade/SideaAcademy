import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from '../shared/interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { Observable, Subject, Subscriber, filter, from, map } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Actions } from '../shared/interfaces/actions-enum';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
})
export class MoviesPage {
  @Output() movieList: CommonList[] = [];
  selectedMovieId: string = '';

  constructor(
    private _movieService: MovieService,
    private _movieRouter: Router,
    private _activateRoute: ActivatedRoute,
    private _toastController: ToastController
  ) {
    this._refreshMovieList();
  }

  ionViewWillEnter() {
    this._refreshMovieList();
  }

  //Messo qua, per esercizio, un filtro sul minimo avgRating che deve avere un film
  private _refreshMovieList(): void {
    this._movieService
      .getMovieList()
      .pipe(
        map((movies: MovieInterface[]) =>
          movies.filter(
            (movie: MovieInterface) => movie.rating.averageRating >= 6
          )
        )
      )
      .subscribe((movies: MovieInterface[]) => {
        this.movieList = movies.map((movie: MovieInterface) => {
          return {
            id: movie.id,
            name: movie.title + "(" + movie.year + ")" + " (" + movie.rating.averageRating + ")",
            rating:(movie.rating.averageRating - 0) / (10)
          };
        });
      });
    /*
    this._movieService.getMovieList().subscribe((movies: MovieInterface[]) => {
      this.movieList = movies.filter((movie: MovieInterface) => movie.rating.averageRating >= 8 ).map(movie => {
        return {
          id:movie.id,
          name:movie.title,
          avgRating:movie.rating.averageRating,
        }
      });
    });
    */
  }

  public selectActionForMovie(emittedObject: EmittedObject) {
    this.selectedMovieId = emittedObject.id;
    console.log('caught movie id : ' + this.selectedMovieId);
    switch (emittedObject.actionSelected) {
      case Actions.Detail: {
        this._goToMovieDetail(this.selectedMovieId);
        break;
      }
      case Actions.Edit: {
        this._goToMovieEdit(this.selectedMovieId);
        break;
      }
      case Actions.Delete: {
        this._deleteMovie(this.selectedMovieId);
        break;
      }
      case Actions.Create: {
        this._goToMovieCreate();
      }
    }
  }

  private _goToMovieDetail(id: string) {
    console.log('redirecting to movie detail');
    this._movieRouter.navigate(['detail', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _goToMovieEdit(id: string) {
    console.log('redirecting to movie editing');
    this._movieRouter.navigate(['edit', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _deleteMovie(movieId: string) {
    this._movieService.deleteMovie(movieId).subscribe((item: unknown) => {
      this.presentToastAfterDelete();
      this._refreshMovieList();
    });
  }

  private _goToMovieCreate() {
    console.log('Redirecting to movie creation');
    this._movieRouter.navigate(['create'], { relativeTo: this._activateRoute });
  }

  async presentToastAfterDelete() {
    const toast = await this._toastController.create({
      message: 'Movie successfully deleted',
      duration: 3000,
      position: 'bottom',
      cssClass: 'delete-toast',
    });

    await toast.present();
  }
}
