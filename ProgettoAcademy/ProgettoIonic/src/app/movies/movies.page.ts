import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from './interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { Observable, Subject, Subscriber, from } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss']
})
export class MoviesPage {
  @Output() movieList:CommonList[] = [];

  selectedMovieId:string="";
  
  constructor(
    private _movieService:MovieService,
    private _movieRouter:Router,
    private _activateRoute:ActivatedRoute,
    private _toastController:ToastController) {
      //Non si fa più uso del subject, adesso entrano in gioco le chiamate API
      this._movieService.getMovieList().subscribe((movies:MovieInterface[]) => {
        //Il mapping si fa QUI e non nel service perchè se la faccio a monte poi il service mi restituisce soltanto la lista di
        //CommonList, ma magari io voglio la lista di MovieInterface
        this.movieList = movies.map((movie:MovieInterface) => {
          return {
            id:movie.id,
            name:movie.title
          }
        })});
    }
  
  //Raccogliere i vari metodi qui sotto
  public selectActionForMovie(emittedObject:EmittedObject){
    this.selectedMovieId = emittedObject.id;
    console.log("caught movie id : "+this.selectedMovieId);
    switch(emittedObject.actionSelected) {
      case 'detail' : {
        this._goToMovieDetail(this.selectedMovieId);
        break;
      }
      case 'edit' : {
        this._goToMovieEdit(this.selectedMovieId);
        break;
      }
      case 'delete' : {
        this._deleteMovie(this.selectedMovieId);
        break;
      }
      case 'create' : {
        this._goToMovieCreate();
      }
    }
  }

  private _goToMovieDetail(id:string) {
    console.log("redirecting to movie detail");
    this._movieRouter.navigate(['detail',id], {relativeTo:this._activateRoute});
  }

  private _goToMovieEdit(id:string) {
    console.log("redirecting to movie editing");
    this._movieRouter.navigate(['edit',id], {relativeTo:this._activateRoute});
  }

  private _deleteMovie(movieId:string) {
    this._movieService.deleteMovie(movieId);
    this.presentToastAfterDelete();
  }

  private _goToMovieCreate() {
    console.log("Redirecting to movie creation");
    this._movieRouter.navigate(['create'], {relativeTo:this._activateRoute});
  }

  async presentToastAfterDelete() {
    const toast = await this._toastController.create({
      message: 'Movie successfully deleted',
      duration: 3000,
      position: 'bottom',
      cssClass:'delete-toast'
    });
  
    await toast.present();
  }
}
