import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from './interfaces/emitted-object-interface';
import { CommonList } from '../shared/interfaces/common-list';
import { Observable, Subject, Subscriber, from } from 'rxjs';

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
    private _activateRoute:ActivatedRoute) {

      this._movieService.$movieObservable$.subscribe((films : MovieInterface[]) => {
        this.movieList = films.map((movie:MovieInterface) => {
          return {
            id:movie.id,
            name:movie.title
          }
        })
      });
      this.getMovies();
  }


  getMovies(){
    this._movieService.getMovieList();
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
        this._goToMovieDelete(this.selectedMovieId);
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

  private _goToMovieDelete(id:string) {
    console.log("redirecting to movie deleting");
    this._movieRouter.navigate(['delete',id], {relativeTo:this._activateRoute});
  }

  private _goToMovieCreate() {
    console.log("Redirecting to movie creation");
    this._movieRouter.navigate(['create'], {relativeTo:this._activateRoute});
  }
}
