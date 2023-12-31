import { Pipe, PipeTransform } from '@angular/core';
import { MovieCastInterface } from '../movies/interfaces/movie-interface';

@Pipe({
  name: 'showCelebrityNamesPipe',
})
export class ShowCelebrityNamesPipe implements PipeTransform {
  transform(cast: MovieCastInterface[] | undefined) {
    return cast
      ?.filter(
        (element) =>
          element.category == 'actor' || element.category == 'actress'
      )
      .map((element) => element.celebrityName)
      .join();
  }
}
