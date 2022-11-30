import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../../movies/models/Movie';
@Pipe({
  name: 'movieSearch'
})
export class MovieSearchPipe implements PipeTransform {
transform(movies: Movie[], search: string, ...args: unknown[]): Movie[] {
return movies.filter((m) => m.name?.toLowerCase().includes(search.toLowerCase()));

   }



}