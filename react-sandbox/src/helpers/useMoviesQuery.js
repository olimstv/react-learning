export const MAX_MOVIES_TO_SHOW = 5;

export function queryMovies(
    usableSearchTerm,
    fromYear,
    toYear,
    movieType
) {
    let cancelFetch = false
    const promise = new Promise((resolve, reject)=>{
        const movies = []
        let numPages;

        const fetchNextPage = (curPage)=>{
        //    cancel further fetching on fn call
        if(cancelFetch){
            resolve(movies)
            return;
        }
        //    toggle to finish fetching
        const isFinished = (numPages !== undefined && curPage > numPages) || movies.length > MAX_MOVIES_TO_SHOW
        if(isFinished){
            resolve(movies)
            return;
        }
        //    fetching
        fetchMovies(usableSearchTerm, movieType, curPage)
            .then(data=>{
                // if error response
                if(data.Response === "False"){
                    reject(data.Error);
                    return;
                }
                // identify the number of pages to fetch from the first fetch
                if(numPages === undefined){
                    numPages = Math.ceil(data.totalResults / 10)
                }
                data.Search.map(movie=>{
                    const passYearsFilter = yearsFilter(movie, fromYear, toYear)
                    if(passYearsFilter){
                        movies.push(movie)
                    }
              })
                fetchNextPage(curPage + 1);
            })
        }
        fetchNextPage(1)
    })
    // cancelPromise function
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
const fetchMovies = async (searchTerm, movieType, page) => {
    const url = urlBuilder(searchTerm, movieType, page);
    const res = await fetch(url)
    const data = await res.json();
    return data;
}
//    filtering results by year
const yearsFilter = (movieObject, filterMinYear, filterMaxYear) => {
    let movieObjMinYear
    let movieObjMaxYear
    let yearStringLength = movieObject.Year.length

    if (yearStringLength === 4 || yearStringLength === 5) {
        movieObjMinYear = parseInt(movieObject.Year.slice(0, 4));
        return movieObjMinYear >= filterMinYear && movieObjMinYear <= filterMaxYear
    }
    if (yearStringLength === 9) {
        movieObjMinYear = parseInt(movieObject.Year.slice(0, 4));
        movieObjMaxYear = parseInt(movieObject.Year.slice(5))

        return (
            (movieObjMinYear >= filterMinYear && movieObjMinYear <= filterMaxYear) ||
            (movieObjMaxYear >= filterMinYear && movieObjMaxYear <= filterMaxYear)
        )
    }
}
export async function selectedMovieDataFetch(movieID){
    const apiUrl = `http://www.omdbapi.com/?i=${movieID}&apikey=81b34f15`
    const data = await fetch(apiUrl);
    return data.json();
}

//    fetching selected movie data
export function enterKeyCheck(e) {
    return e.code === 'Enter'
}