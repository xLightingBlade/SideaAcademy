import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from '../shared/interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { BehaviorSubject, combineLatest, filter, map, pipe, switchMap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Actions } from '../shared/interfaces/actions-enum';
import { RangeValue } from '@ionic/core';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
})
export class MoviesPage {
  startingMovieList: CommonList[] = [];
  @Output() currentMovieList: CommonList[] = [];
  selectedMovieId: string = '';
  /* Siccome il rating non è un query parameter, non ho mica bisogno di chiamare il backend ogni volta che cambio
    il mio rating minimo desiderato. Basta che filtro sulla lista dei film che ho preso con la prima chiamata.
    Mi creo quindi una lista iniziale e una corrente, inizializzata a quella iniziale e poi modificata di volta in volta
    Per fare programmazione reattiva, il rating diventa un subject, inizializzato a zero. Ogni volta che cambio il valore del
    rating, emetto il nuovo valore. Il componente è in ascolto dei cambiamenti del rating */
  selectedMovieRatingMinimum: number = 0;
  selectedRating$ = new BehaviorSubject(this.selectedMovieRatingMinimum);

  constructor(
    private _movieService: MovieService,
    private _movieRouter: Router,
    private _activateRoute: ActivatedRoute,
    private _toastController: ToastController
  ) {
    this.selectedRating$.subscribe((selectedDecimalRating) =>
      this.updateCurrentMovieList(selectedDecimalRating)
    );
  }

  ionViewWillEnter() {
    /*combineLatest({
      movieList: this._movieService.getMovieList(),
      rating: this.selectedRating$,
    }).subscribe(({ movieList, rating }) => {
      this.startingMovieList = movieList.map((movie: MovieInterface) => {
        return {
          id: movie.id,
          name: movie.title,
          rating: movie.rating.averageRating / 10,
        };
      });
      this.updateCurrentMovieList(rating);
    });
    
    //Alla fine è un'altra soluzione allo stesso problema.
    /*Qui con lo switchmap passo dall'observable di MovieInterface[] ad un observable di numeri(i rating)
    Quando cambia il rating, si rientra nella pipe*/
    
    this._movieService.getMovieList().pipe(switchMap((movies:MovieInterface[]) => {
      this.startingMovieList = movies.map((movie) => {
        return {
          id:movie.id,
          name:movie.title,
          rating:movie.rating.averageRating/10,
        };
      });
      return this.selectedRating$;
    })
    ).subscribe((rating) => {
      this.updateCurrentMovieList(rating);
    })
  }

  updateCurrentMovieList(selectedDecimalRating: number): void {
    this.currentMovieList = this.startingMovieList.filter(
      (movie) => (movie.rating || 0) >= selectedDecimalRating
    );
  }

  setMovieRating(rating: RangeValue) {
    const decimalRating = Number(rating) / 100;
    this.selectedRating$.next(decimalRating);
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
    //TODO modifiche alla luce di rimozione refreshMovieList()
    this._movieService.deleteMovie(movieId).subscribe((item: unknown) => {
      this.presentToastAfterDelete();
      //this._refreshMovieList();
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
