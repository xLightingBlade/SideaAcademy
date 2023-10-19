import { Component, Output } from '@angular/core';
import { MovieInterface } from './interfaces/movie-interface';
import { MovieService } from './services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';

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

  catchMovieId(id:string){
    this.selectedMovieId=id;
    console.log("caught movie id: "+id);
    this.goToMovieDetail(id);
  }

  private goToMovieDetail(id:string){
    console.log("Redirecting to movie detail")
    this._movieRouter.navigate(['detail',id], {relativeTo:this._activateRoute});
  }
}
