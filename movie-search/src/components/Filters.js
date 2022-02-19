
export default function Filters({
                                    MOVIE_TYPE_TO_FILTER_VALUE,
                                    movieTypeIndex,
                                    handleMovieTypeChange}){
    console.log("MOVIE_TYPE_TO_FILTER_VALUE", MOVIE_TYPE_TO_FILTER_VALUE)
 return <div id="filters">
     <div className="years">
         <label htmlFor="yearFrom">From</label>
     <input type="range"/>
     <br/>
         <label htmlFor="yearTo">To</label>
     <input type="range"/>
     </div>
     <div className="types">
         {MOVIE_TYPE_TO_FILTER_VALUE.map(({title, filter}, index) => {
return (<>
             <input
                 type='radio'
                 value={filter}
                 onChange={handleMovieTypeChange.bind(null,index)}
                 key={filter}
                 checked={movieTypeIndex === index}
             />
             <label for="title">{title}</label>
    </>
         )
         })}
     </div>
 </div>
}