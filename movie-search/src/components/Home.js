import '../App.css'
import Search from "./Search";
import {useState} from "react";
import {
    MOVIE_TYPE_TO_FILTER_VALUE,
    MIN_YEAR_VALUE,
    MAX_YEAR_VALUE
    } from "../constants";


export default function Home(){
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [movieTypeIndex, setMovieTypeIndex] = useState(0)
    const [yearsSliderValue, setYearsSliderValue] =useState([MIN_YEAR_VALUE, MAX_YEAR_VALUE])



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
        />
    )
}

