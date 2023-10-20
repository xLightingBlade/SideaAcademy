import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmittedObject } from './interfaces/emitted-object-interface';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss']
})
export class MoviesPage {
  @Output() movieList:MovieInterface[] = [];

  selectedMovieId:string="";
  
  constructor(
    private _movieService:MovieService,
    private _movieRouter:Router,
    private _activateRoute:ActivatedRoute) {
    this.movieList = _movieService.getMovieList();
  }

  ionViewWillEnter(){
    this.movieList=this._movieService.getMovieList();
  }
  

  public selectActionForMovie(emittedObject:EmittedObject){
    this.selectedMovieId = emittedObject.movieId;
    console.log("caught movie id : "+this.selectedMovieId);
    if(emittedObject.actionSelected == "detail") {
      this.goToMovieDetail(this.selectedMovieId);
    } else if(emittedObject.actionSelected == "edit") {
      this.goToMovieEdit(this.selectedMovieId);
    } else if(emittedObject.actionSelected == "delete") {
      this.goToMovieDelete(this.selectedMovieId);
    }
  }

  private goToMovieDetail(id:string) {
    console.log("redirecting to movie detail");
    this._movieRouter.navigate(['detail',this.selectedMovieId], {relativeTo:this._activateRoute});
  }

  private goToMovieEdit(id:string) {
    console.log("redirecting to movie editing");
    this._movieRouter.navigate(['edit',this.selectedMovieId], {relativeTo:this._activateRoute});
  }

  private goToMovieDelete(id:string) {
    console.log("redirecting to movie deleting");
    this._movieRouter.navigate(['delete',this.selectedMovieId], {relativeTo:this._activateRoute});
  }

}
