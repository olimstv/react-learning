import MoviesList from "./MoviesList";
import MovieDetails from "./MovieDetails";

const Showcase = ({movieQueryResult, handleMovieItemClick, selectedMovie, message, bookmarkedMovies, handleWatchlistBtnClick}) => {
  return (
    <div id='showcase'>
      <MoviesList
          movies={movieQueryResult}
          handleMovieItemClick={handleMovieItemClick}
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
