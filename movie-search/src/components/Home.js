import '../App.css'
import Search from "./Search";
import {useState} from "react";
import {MOVIE_TYPE_TO_FILTER_VALUE} from "../constants";


export default function Home(){
    const [searchTerm, setSearchTerm] = useState(undefined)
    const [movieTypeIndex, setMovieTypeIndex] = useState(0)


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


    return (
        <Search
            searchTerm={searchTerm} handleSearchInput={handleSearchInput}
            MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
            movieTypeIndex={movieTypeIndex}
            handleMovieTypeChange={handleMovieTypeChange}
        />
    )
}

