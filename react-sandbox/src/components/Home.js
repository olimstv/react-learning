import '../App.css'
import Search from "./Search";
import {useState} from "react";
import {
    MOVIE_TYPE_TO_FILTER_VALUE,
    MIN_YEAR_VALUE,
    MAX_YEAR_VALUE,
    MESSAGES,
    LOCAL_STORAGE_KEY
} from "../constants";
import {enterKeyCheck, queryMovies, selectedMovieDataFetch} from "../helpers/useMoviesQuery";
import Showcase from "./Showcase";


const Home = () => {
    const [initialLocalStorage] = useState(()=>{
    //    Get from localStorage by key
        const item = window.localStorage.getItem(LOCAL_STORAGE_KEY)
        return item ? JSON.parse(item) : null;
    })
    const [searchTerm, setSearchTerm] = useState(()=>{
        return initialLocalStorage?.searchTerm ?? '';
    })
    const [movieTypeIndex, setMovieTypeIndex] = useState(()=>{
        return initialLocalStorage?.movieTypeIndex ?? 0
    })
    const [yearsSliderValue, setYearsSliderValue] = useState(()=>{
        return initialLocalStorage?.yearsSliderValue ?? [MIN_YEAR_VALUE, MAX_YEAR_VALUE]})
    const [movieQueryMeta, setMovieQueryMeta] = useState()
    const [movieQueryResult, setMovieQueryResult] = useState(()=>{
        return initialLocalStorage?.movieQueryResult ?? []
    })
    const [message, setMessage] = useState(()=>{
        return initialLocalStorage?.message ?? MESSAGES.initial
    })
    const [selectedMovie, setSelectedMovie] = useState(()=>{
        return initialLocalStorage?.selectedMovie ?? undefined
    })
    const [bookmarkedMovies, setBookmarkedMovies] = useState(()=> {
        return initialLocalStorage?.bookmarkedMovies ?? []
    })


    const saveStatesToLocalStorage = ((override = {})=>{
        const newValue = {
            movieQueryResult,
            movieTypeIndex,
            searchTerm,
            yearsSliderValue,
            selectedMovie,
            bookmarkedMovies,
            ...override}
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
    })
//    handlers
    const handleSearchTermChange = (e) => {
        let searchTerm = e.target.value;
        console.log('searchTerm', searchTerm)
        setSearchTerm(searchTerm)
    }

    const handleMovieTypeChange = index => {
        console.log('movieTypeIndex', index)
        setMovieTypeIndex(index)
    }
    const handleYearsSliderValueChange = (newYearsArray) => {
        console.log("newYearsArray", newYearsArray)
        setYearsSliderValue(newYearsArray);
    }
    const handleSearchEnterKeyPress = (e) => {
        let usableSearchTerm = searchTerm.trim()
        //check if the "Enter" key was pressed
        if (!enterKeyCheck(e)) {
            //false? exit function
            return;
        }
        //    true? assign values from years filter state to the variables
        //    assign moviesType to a variable
        let fromYear, toYear;
        if(yearsSliderValue[0] < yearsSliderValue[1]){
            fromYear = yearsSliderValue[0];
            toYear = yearsSliderValue[1];
        } else {
            fromYear = yearsSliderValue[1]
            toYear = yearsSliderValue[0];
        }
        let movieType = MOVIE_TYPE_TO_FILTER_VALUE[movieTypeIndex]

        const newQueryMeta = queryMovies(
            usableSearchTerm,
            fromYear,
            toYear,
            movieType);
        // parsing the promise, returned from queryMovies
        newQueryMeta.promise
            .then(data=>{
            if(data[0].Response === "False"){
                setMessage(data[0].Error)
            } else {
                setMessage(MESSAGES.select)
                setMovieQueryResult(data)
                saveStatesToLocalStorage({movieQueryResult: data})
            }
            console.log('movies', data)
        }).catch(errorMessage=>{
            setMessage(errorMessage)
        })
    //    updating the movieQueryMeta state
        setMovieQueryMeta(oldQueryMeta=>{
            if(oldQueryMeta && oldQueryMeta.cancelPromise){
                oldQueryMeta.cancelPromise()
            }
            return newQueryMeta
        })
    }
    const handleMovieItemClick = async movieID =>{
        const data = await selectedMovieDataFetch(movieID)
        setSelectedMovie(data);
        saveStatesToLocalStorage({selectedMovie: data})
    }

    const handleWatchlistBtnClick = (e)=>{
        const movieToBookmark = selectedMovie;
        let newBookmarkedMoviesArray = []
        const isAlreadyBookmarked = bookmarkedMovies.some(movie=>movie.imdbID === movieToBookmark.imdbID);

        if (isAlreadyBookmarked){
            newBookmarkedMoviesArray = bookmarkedMovies.filter(movie=>movie.imdbID !== movieToBookmark.imdbID);
        } else {
            newBookmarkedMoviesArray = [...bookmarkedMovies, movieToBookmark]
        }
        setBookmarkedMovies(newBookmarkedMoviesArray);
        saveStatesToLocalStorage({bookmarkedMovies: newBookmarkedMoviesArray})
    }

    return (
        <>
            <Search
                searchTerm={searchTerm}
                handleSearchTermChange={handleSearchTermChange}
                searchKeyPress={handleSearchEnterKeyPress}
                MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
                movieTypeIndex={movieTypeIndex}
                handleMovieTypeChange={handleMovieTypeChange}
                yearsSliderValue={yearsSliderValue}
                handleYearsSliderValueChange={handleYearsSliderValueChange}
                MIN_YEAR={MIN_YEAR_VALUE}
                MAX_YEAR={MAX_YEAR_VALUE}
            />
            <Showcase
                movieQueryResult={movieQueryResult}
                handleMovieItemClick={handleMovieItemClick}
                selectedMovie={selectedMovie}
                message={message}
                bookmarkedMovies={bookmarkedMovies}
                handleWatchlistBtnClick={handleWatchlistBtnClick}
            />
        </>
    )
}

export default Home;