import Filters from "./Filters";

export default function Search({
                                   searchTerm,
                                   handleSearchInput,
                                   MOVIE_TYPE_TO_FILTER_VALUE,
                                   movieTypeIndex,
                                   handleMovieTypeChange}){
    return (
        <div id="search">
            <div className='input-box'>
                <input
                    onChange={e => handleSearchInput(e)}
                    value = {searchTerm}
                    type="text"/>
            </div>
            <Filters
                MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
                movieTypeIndex={movieTypeIndex}
                handleMovieTypeChange={handleMovieTypeChange}
            />
        </div>
    )
}