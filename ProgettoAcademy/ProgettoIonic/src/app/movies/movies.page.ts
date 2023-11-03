import { Component, Output, ViewChild } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from '../shared/interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { BehaviorSubject, debounceTime, startWith, switchMap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Actions } from '../shared/interfaces/actions-enum';
import { RangeValue } from '@ionic/core';
import { MoviesPageContent } from './components/movies-page-content';

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
  searchResultList: CommonList[] = [];

  //Con questo decoratore ho creato una referenza verso l'istanza della componente MoviesPageContent.
  @ViewChild(MoviesPageContent) movieContentPageVariable!: MoviesPageContent;

  constructor(
    private _movieService: MovieService,
    private _movieRouter: Router,
    private _activateRoute: ActivatedRoute,
    private _toastController: ToastController
  ) {
    this.selectedRating$.subscribe((selectedDecimalRating) =>
      this.updateRatingFilteredMovieList(selectedDecimalRating)
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

    /*è tutto un giro di cambiamenti di observable. inizio con l'observable restituito dal form di ricerca,
    poi lo cambio in un observable di array di films che mi viene restituito dal service,
    poi lo ricambio in observable di numeri che sono i rating e che uso per filtrare in locale. Adesso funge 
    ERGO: switchmap = la uso per dare ordine a diversi flussi, a sequenze asincrone diverse dove però c'è una dipendenza,
    nel senso che un flusso successivo ha bisogno di dati del flusso precedente. Abbiamo cioè reso sequenziale un insieme di flussi asincroni
    */
    this.movieContentPageVariable.titleSearchForm
      .get('title')
      ?.valueChanges.pipe(
        //senza startWith il flusso è inizialmente vuoto e non vedrò niente finchè non scrivo qualcosa in searchbar
        startWith(''),
        debounceTime(500),
        switchMap((title:string) => {
          return this._movieService.getMoviesByTitle(title);
        }),
        switchMap((movies: MovieInterface[]) => {
          this.startingMovieList = movies.map((movie) => {
            return {
              id: movie.id,
              name: movie.title,
              rating: movie.rating.averageRating,
              year:movie.year,
              //dall'array di oggetti cast mi prendo solo il campo dei nomi, l'array risultante lo fondo in una stringa col join
              celebrityNames:movie.cast?.map(element => element.celebrityName).join()
            };
          });
          return this.selectedRating$;
        })
      )
      .subscribe((rating) => {
        this.updateRatingFilteredMovieList(rating);
      });
  }

  updateRatingFilteredMovieList(selectedDecimalRating: number): void {
    this.currentMovieList = this.startingMovieList.filter(
      (movie) => (movie.rating || 0) >= selectedDecimalRating
    );
  }

  setMovieSearchRating(rating: RangeValue) {
    const decimalRating = Number(rating) / 10;
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
