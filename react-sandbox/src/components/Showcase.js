import MoviesList, {PAGE_MODE_HOME} from "./MoviesList";
import MovieDetails from "./MovieDetails";

const Showcase = ({movieQueryResult, handleMovieItemClick, selectedMovie, message, bookmarkedMovies, handleWatchlistBtnClick}) => {
  return (
    <div id='showcase'>
      <MoviesList
          movies={movieQueryResult}
          bookmarkedMovies={bookmarkedMovies}
          handleMovieItemClick={handleMovieItemClick}
          pageMode={PAGE_MODE_HOME}
          selectedMovie={selectedMovie}
      />
        <MovieDetails
            selectedMovie={selectedMovie}
            message={message}
            bookmarkedMovies={bookmarkedMovies}
            handleWatchlistBtnClick={handleWatchlistBtnClick}
        />
    </div>
  );
};

export default Showcase;
