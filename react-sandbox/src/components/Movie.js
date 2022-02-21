
const Movie = ({movie, handleMovieItemClick}) => {
    return (
        <>
            {movie && (
                <div
                    onClick={e=>{handleMovieItemClick(movie.imdbID)}}
                >
                        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
                    <div>

                        <p>{movie.Title}</p>
                        <span>{movie.Year}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Movie;
