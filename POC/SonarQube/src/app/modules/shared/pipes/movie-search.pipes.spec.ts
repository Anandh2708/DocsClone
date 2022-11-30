import { movieMock, movies } from '../../movies/test-data/db-movies';
import { MovieSearchPipe } from './movie-search.pipes';
describe('MovieSearchPipe', () => {
  it('should create an instance', () => {
    const pipe = new MovieSearchPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return a list with movie name matching input string', () => {
    const pipe = new MovieSearchPipe();
    expect(pipe.transform(movies,'mast')).toEqual([movies[0]]);
  });
  it('should return a empty list when no movie name matches input string', () => {
    const pipe = new MovieSearchPipe();
    expect(pipe.transform(movies,'unknown')).toEqual([]);
  });
});