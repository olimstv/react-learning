import '../App.css'
import Search from "./Search";
import {useState} from "react";
import {
    MOVIE_TYPE_TO_FILTER_VALUE,
    MIN_YEAR_VALUE,
    MAX_YEAR_VALUE
    } from "../constants";
import {enterKeyCheck, queryMovies} from "../helpers/useMoviesQuery";


export default function Home(){
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [movieTypeIndex, setMovieTypeIndex] = useState(0)
    const [yearsSliderValue, setYearsSliderValue] =useState([MIN_YEAR_VALUE, MAX_YEAR_VALUE])
    const [movieQueryMeta, setMovieQueryMeta] = useState()
    const [movieQueryResults, setMovieQueryResults] = useState([])

//    handlers
    const handleSearchInput = (e)=>{
        let searchTerm = e.target.value;
        console.log('searchTerm',searchTerm)
        setSearchTerm(searchTerm)
    }
    const handleMovieTypeChange = index=>{
        console.log('movieTypeIndex', index)
        setMovieTypeIndex(index)
    }
    const handleYearsSliderValueChange = (newYearsArray)=>{
            console.log("newYearsArray", newYearsArray)
        setYearsSliderValue(newYearsArray);
    }
    const handleSearchEnterKeyPress = (e)=>{
        if(!enterKeyCheck(e)){
            return;
        }

        let usableSearchTerm = searchTerm.trim();
        let fromYear, toYear;
        if(yearsSliderValue[0] < yearsSliderValue[1]){
            fromYear = yearsSliderValue[0];
            toYear = yearsSliderValue[1];
        } else {
            fromYear = yearsSliderValue[1];
            toYear = yearsSliderValue[0];
        }

        let movieType = MOVIE_TYPE_TO_FILTER_VALUE[movieTypeIndex]

    //    get a promise from queryMovies fn
    const newQueryMeta = queryMovies(fromYear, toYear, movieType, usableSearchTerm);

        newQueryMeta.then(data=>{

            console.log('searchResults: ', data)
        }
        )


    }

    return (
        <Search
            searchTerm={searchTerm} handleSearchInput={handleSearchInput}
            MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
            movieTypeIndex={movieTypeIndex}
            handleMovieTypeChange={handleMovieTypeChange}
            yearsSliderValue={yearsSliderValue}
            handleYearsSliderValueChange={handleYearsSliderValueChange}
            MIN_YEAR={MIN_YEAR_VALUE}
            MAX_YEAR={MAX_YEAR_VALUE}
            handleSearchEnterKeyPress={handleSearchEnterKeyPress}
        />
    )
}

