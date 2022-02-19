
export const MAX_MOVIES_TO_SHOW = 5;

export function queryMovies(
    usableSearchTerm,
    fromYear,
    toYear,
    movieType
){
    let cancelFetch = false



    const promise = new Promise((resolve, reject)=>{
        let numPages;
        let movies = [];

        const fetchNextPage = (curPage)=>{
            if(cancelFetch){
                resolve(movies)
                return
            }

            const isFinished = numPages !== undefined && curPage > numPages;

            if(isFinished){
                resolve(movies)
                return;
            }

            fetchMovies(usableSearchTerm, movieType, curPage)
                .then(data=>{
                    // console.log(`current page is: ${curPage}`)
                    if(data.Response === 'False'){
                        reject(data.Error)
                        return;
                    }
                // count pages to fetch
                    if(numPages === undefined){
                        numPages = Math.ceil(data.totalResults / 10)
                    }

                    data.Search.map((movie)=>{
                        const passYearFilter = yearsFilter(movie, fromYear, toYear)
                        console.log('movie',movie.Year)
                        console.log(passYearFilter)
                        if(passYearFilter){
                        movies.push(movie);
                        }
                    }
                )
                fetchNextPage(curPage + 1);
                    resolve(movies);
                    console.log('results', movies)
                }
            )
        }
        fetchNextPage(1)
    })
const cancelPromise = ()=>{
        cancelFetch = true;
}

const queryMeta = {promise, cancelPromise}
    return queryMeta;
}



//    creating url
const urlBuilder = (searchTerm, movieType, page) => {
    let url;
    return (url = `https://www.omdbapi.com/?s=${searchTerm}&type=${movieType.filter}&page=${page}&apikey=81b34f15`);
}
//    fetching the movies
const fetchMovies = async (searchTerm, movieType, page)=>{
    const url = urlBuilder(searchTerm, movieType, page);
    const res = await fetch(url)
    const data = await res.json();
    return data;
}
//    filtering results by year
const yearsFilter = (movieObject, filterMinYear, filterMaxYear)=>{
    let movieObjMinYear
    let movieObjMaxYear
    let yearStringLength = movieObject.Year.length

    if(yearStringLength === 4 || yearStringLength === 5){
        movieObjMinYear = parseInt(movieObject.Year.slice(0, 4));
        return movieObjMinYear >= filterMinYear && movieObjMinYear <= filterMaxYear
    }
    if(yearStringLength === 9){
        movieObjMinYear = parseInt(movieObject.Year.slice(0,4));
        movieObjMaxYear = parseInt(movieObject.Year.slice(5))

        return (
            (movieObjMinYear >= filterMinYear && movieObjMinYear <= filterMaxYear) ||
                (movieObjMaxYear >= filterMinYear && movieObjMaxYear <= filterMaxYear)
        )
    }
}
//    fetching selected movie data
export function enterKeyCheck(e){
    return e.code === 'Enter'
}