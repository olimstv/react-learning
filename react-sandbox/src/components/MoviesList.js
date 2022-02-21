import Movie from "./Movie";

export const PAGE_MODE_HOME = 'home'
export const PAGE_MODE_WATCHLIST = 'watchlist'


const MoviesList = ({movies, handleMovieItemClick})=>{
    const counterStr = `${movies.length} results`
return (
        <div id="movies-list">
            <div className='results-count'>
                <p>{counterStr}</p>
            </div>
            {movies.map((movie)=>{
                return (
                    <Movie
                        key={movie.imdbID}
                        movie={movie}
                        handleMovieItemClick={handleMovieItemClick}
                    />
                )
            })}
        </div>
)
}

export default MoviesList;