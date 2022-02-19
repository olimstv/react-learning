import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';


export default function Filters({
                                    MOVIE_TYPE_TO_FILTER_VALUE,
                                    movieTypeIndex,
                                    handleMovieTypeChange,
                                    yearsSliderValue,
                                    handleYearsSliderValueChange,
                                    MIN_YEAR,
                                    MAX_YEAR
}){
    console.log("MOVIE_TYPE_TO_FILTER_VALUE", MOVIE_TYPE_TO_FILTER_VALUE)
 return <div id="filters">
             <div id="years-filter">
                 <Box sx={{textTransform: 'uppercase'}} id="">Year</Box>
                 <div className='year-slider'>
                     <span>{yearsSliderValue[0]}</span>
                     <Box sx={{width: 150, margin:'auto 15px'}}>
                         <Slider

                             getAriaLabel={() => 'Years'}
                             value={yearsSliderValue}
                             onChange={(event, newValue) =>
                                 handleYearsSliderValueChange(newValue)
                             }
                             valueLabelDisplay='off'
                             size='medium'
                             min={MIN_YEAR}
                             max={MAX_YEAR}
                         />
                     </Box>
                     <span>{yearsSliderValue[1]}</span>
                 </div>
             </div>

     <Box className="types-filter">
         {MOVIE_TYPE_TO_FILTER_VALUE.map(({title, filter}, index) => {
             return (<>
                <input
                    type='radio'
                    value={filter}
                    onChange={handleMovieTypeChange.bind(null,index)}
                    key={filter}
                    checked={movieTypeIndex === index}
                />
             <label htmlFor="title">{title}</label>
    </>
         )
         })}
     </Box>
 </div>
}