import MoviesList, {PAGE_MODE_WATCHLIST} from "./MoviesList";
import MovieDetails from "./MovieDetails";
import {useState} from "react";
import {LOCAL_STORAGE_KEY, MESSAGES} from "../constants";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";
import {MdBookmarkBorder} from "react-icons/md";


const Watchlist = ()=>{
    const [initialLocalStorage] = useState(()=>{
    // get from localStorage by key
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY)
        return item ? JSON.parse(item) : null;
    })
    const [message, setMessage] = useState(MESSAGES.select);
    const [bookmarkedMovies, setBookmarkedMovies] = useState(()=>{
        return initialLocalStorage?.bookmarkedMovies ?? []
    })
    const [selectedMovie, setSelectedMovie] = useState()
    const saveStatesToLocalStorage = (override = {})=>{
        // get from localStorage by key
        let existingValue = window.localStorage.getItem(LOCAL_STORAGE_KEY)
        // parse stored json or if none return initial value
        existingValue = existingValue ? JSON.parse(existingValue) : {}
        const newValue = { ...existingValue, watchlistMovies: bookmarkedMovies, ...override }
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
    }
    const handleMovieItemClick = movieID =>{
        const movieToSelect = bookmarkedMovies.find(movie=>movie.imdbID === movieID)
        setSelectedMovie(movieToSelect)
    }

    const handleWtchlistBtnClick = e=>{
        const movieToBookmark = selectedMovie;
        let newBookmarkedMoviesArray = []
        const isAlreadyBookmarked = bookmarkedMovies.some(movie => movie.imdbID === movieToBookmark.imdbID);
        if(isAlreadyBookmarked){
            newBookmarkedMoviesArray = bookmarkedMovies.filter(movie=>movie.imdbID !== movieToBookmark.imdbID)
        } else {
            newBookmarkedMoviesArray = [ ...bookmarkedMovies, movieToBookmark]
        }
    //    pass the new list of bookmarked movies to the states
        setBookmarkedMovies(newBookmarkedMoviesArray)
        saveStatesToLocalStorage({bookmarkedMovies: newBookmarkedMoviesArray})
    }

    return (
        <div id="watchlist">
            <div className="navbar">
                <MdBookmarkBorder color='#ffa200' /> Watchlist
            </div>
            {bookmarkedMovies &&
                (<MoviesList
                    movies={bookmarkedMovies}
                    handleMovieItemClick={handleMovieItemClick}
                    bookmarkedMovies={bookmarkedMovies}
                    selectedMovie={selectedMovie}
                    pageMode={PAGE_MODE_WATCHLIST}
                />)
            }
            <MovieDetails
                message={message}
                selectedMovie={selectedMovie}
                handleWatchlistBtnClick={handleWtchlistBtnClick}
                bookmarkedMovies={bookmarkedMovies}
            />
        </div>

    )
}
export default Watchlist;