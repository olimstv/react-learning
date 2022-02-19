
export const MAX_MOVIES_TO_SHOW = 5;

export function queryMovies(
    usableSearchTerm,
    fromYear,
    toYear,
    movieType
){
    let cancelFetch = false;

    const promise = new Promise((resolve, reject)=> {
        let numPages;
        let movies = [];


        const fetchNextPage = (currPage) => {

            if(cancelFetch){
                resolve(movies)
                return;
            }
            const isFinished = (numPages !==undefined && currPage > numPages)
                // || movies.length > MAX_MOVIES_TO_SHOW
console.log(`page ${currPage} is fetchng`)

            if(isFinished){
                resolve(movies)
                return
            }
        fetchMovies(usableSearchTerm, movieType, currPage)
            .then(data => {
                if (data.Response === 'False') {
                    reject(data.Error);
                    return;
                }
                // if we haven't count number of pages yet
                if (numPages === undefined) {
                    numPages = Math.ceil(data.totalResults / 10)
                    console.log('numPages', numPages)
                }
                data.Search.map((movie) => {

                    movies.push(movie)
                })
                //    fetching the next page
                fetchNextPage(currPage +1)

                resolve(movies)
            })
    }
    fetchNextPage(1)
    })
const cancelPromise = () => {
    cancelFetch = true
}
const queryMeta = {promise, cancelPromise}

    console.log(promise)
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
//    fetching selected movie data
export function enterKeyCheck(e){
    return e.code === 'Enter'
}