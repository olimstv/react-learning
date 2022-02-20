import Filters from "./Filters";

export default function Search({
                                   searchTerm,
                                   handleSearchTermChange,
                                   searchKeyPress,
                                   MOVIE_TYPE_TO_FILTER_VALUE,
                                   movieTypeIndex,
                                   handleMovieTypeChange,
                                   MIN_YEAR,
                                   MAX_YEAR,
                                   yearsSliderValue,
                                   handleYearsSliderValueChange
}){
    return (
        <div id="search">
            <div className='input-box'>
                <input
                    onChange={e => handleSearchTermChange(e)}
                    onKeyDown={e => searchKeyPress(e)}
                    value = {searchTerm}
                    type="text"/>
            </div>
            <Filters
                MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
                movieTypeIndex={movieTypeIndex}
                handleMovieTypeChange={handleMovieTypeChange}
                yearsSliderValue={yearsSliderValue}
                handleYearsSliderValueChange={handleYearsSliderValueChange}
                MIN_YEAR={MIN_YEAR}
                MAX_YEAR={MAX_YEAR}
            />
        </div>
    )
}