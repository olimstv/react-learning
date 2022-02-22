import Movie from "./Movie";
import {Link} from "react-router-dom";
import {MdBookmarkBorder, MdOutlineHome} from 'react-icons/md'

export const PAGE_MODE_HOME = 'home'
export const PAGE_MODE_WATCHLIST = 'watchlist'


const MoviesList = ({movies, handleMovieItemClick, bookmarkedMovies, selectedMovie, pageMode})=>{
    const counterStr = `${movies.length} results`

    const showNavigationBtn = pageMode === PAGE_MODE_WATCHLIST || bookmarkedMovies.length !== 0
    let btnDOM;

    switch (pageMode) {
        case PAGE_MODE_WATCHLIST:
            btnDOM = <>
                    <MdOutlineHome className='btn-icon' size='1.5rem' color='#ffa200'/>
                    <Link to='/'>
                        Back to home
                    </Link>
                </>;
            break;
        case PAGE_MODE_HOME:
            btnDOM = <>
                    <MdBookmarkBorder className='btn-icon' size='1.5rem' color='#ffa200'/>
                    <Link to='/watchlist'>
                            Watchlist
                    </Link>
                </>;
            break;
        default:
            throw new Error(`Unknown page mode = "${pageMode}".`);

    }
return (
        <div id="movies-list">
            {
                showNavigationBtn &&
                <button className="bookmarked-movies">
                    {btnDOM}
                </button>
            }

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