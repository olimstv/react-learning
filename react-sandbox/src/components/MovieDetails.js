import { MdBookmarkBorder } from 'react-icons/md';
import { MdBookmark } from 'react-icons/md';

export default function MovieDetails({selectedMovie, message, bookmarkedMovies, handleWatchlistBtnClick}){
    let isBookmarked = false;
if(bookmarkedMovies.length !== 0 && selectedMovie !== undefined) {
    isBookmarked = bookmarkedMovies.some(movie=>movie.imdbID === selectedMovie.imdbID)
}
    return (
        <div id="movie-details">
            {!selectedMovie
                ?(<span className='message'>{message}</span>)
                :(
                    <>
                        <div className='movie-title'>
                            <img src={selectedMovie.Poster} alt={`${selectedMovie.Title} poster`}/>
                            <div className="watchlist-btn">
                                <button
                                    onClick={e=>{handleWatchlistBtnClick(e)}}
                                    className='btn-outline'

                                >
                                    {isBookmarked
                                        ? <MdBookmark color='#ffa200' />
                                        : <MdBookmarkBorder color='#ffa200' />}
                                    Watchlist</button>
                            </div>
                            <div className='movie-details'>
                                <h2 className='title-text'>{selectedMovie.Title}</h2>
                                <div className='tag'>{selectedMovie.Rated}</div>
                                <p>
                                    {selectedMovie.Year} &#183; {selectedMovie.Genre} &#183;{' '}
                                    {selectedMovie.Runtime}
                                </p>
                            </div>
                            <div className='movie-staff'>
                                <p>{selectedMovie.Actors}</p>
                            </div>
                        </div>

                    <div className='movie-plot'>
                    <p>{selectedMovie.Plot}</p>
                    </div>
                        <div className='movie-ratings'>
                            {selectedMovie.Ratings.map((rating, i) => {
                                return (
                                    <div className='rating-box' key={i}>
                                        <h4>{rating.Value}</h4>
                                        <span>{rating.Source}</span>
                                    </div>
                                );
                            })}
                        </div>
                </>

                )}
        </div>
    )
}