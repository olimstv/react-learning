import '../App.css'
import Search from "./Search";
import {useState} from "react";
import {
    MOVIE_TYPE_TO_FILTER_VALUE,
    MIN_YEAR_VALUE,
    MAX_YEAR_VALUE,
    MESSAGES
} from "../constants";
import {enterKeyCheck, queryMovies} from "../helpers/useMoviesQuery";
import Showcase from "./Showcase";


export default function Home() {
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [movieTypeIndex, setMovieTypeIndex] = useState(0)
    const [yearsSliderValue, setYearsSliderValue] = useState([MIN_YEAR_VALUE, MAX_YEAR_VALUE])
    const [movieQueryMeta, setMovieQueryMeta] = useState()
    const [movieQueryResult, setMovieQueryResult] = useState([])
    const [message, setMessage] = useState(MESSAGES.initial)


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
        if (yearsSliderValue[0] < yearsSliderValue[1]) {
            fromYear = yearsSliderValue[0];
            toYear = yearsSliderValue[1];
        } else {
            fromYear = yearsSliderValue[1];
            toYear = yearsSliderValue[0];
        }
        let movieType = MOVIE_TYPE_TO_FILTER_VALUE[movieTypeIndex]
        const newQueryMeta = queryMovies(usableSearchTerm, fromYear, toYear, movieType);

        newQueryMeta.promise.then(data=>{
            if(data[0].Response) {
                setMessage(data[0].Error)
            } else {
                setMessage(MESSAGES.select)
                setMovieQueryResult(data)
            }
            }
        ).catch(errorMessage=>{
            setMessage(errorMessage)
        })
        setMovieQueryMeta((oldQueryMeta)=>{
            if(oldQueryMeta && oldQueryMeta.cancelPromise){
                console.log(oldQueryMeta.cancelPromise())
            }
        })
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
            <Showcase/>
        </>
    )
}

