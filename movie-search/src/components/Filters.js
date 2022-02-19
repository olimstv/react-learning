import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import {FormControlLabel, RadioGroup} from "@mui/material";


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

     <div className="types-filter">
         <Box sx={{textTransform: 'uppercase'}}>Type</Box>
         <RadioGroup row>
         {MOVIE_TYPE_TO_FILTER_VALUE.map(({title, filter}, index) => {
             return (<>
                <FormControlLabel
                    key={filter}
                    value={filter}
                    checked={movieTypeIndex === index}
                    control={<Radio size='medium' /> }
                    onChange={handleMovieTypeChange.bind(null,index)}
                    label={title}
                />

    </>
         )
         })}
         </RadioGroup>
     </div>
 </div>
}