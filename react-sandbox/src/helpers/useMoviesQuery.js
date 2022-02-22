export function queryMovies(
                            fromYear,
                            toYear,
                            movieType,
                            usableSearchTerm
){
    const movies = []
    const promise = new Promise((resolve, reject)=>{

        fetchMovies(usableSearchTerm, movieType, 1)
            .then(data => {
                console.log('data',data)

                data.Search.map(item=>{
                    movies.push(item)
                })
                    resolve(movies)
            })


    })
    return promise
}
// fetching the data
export async function fetchMovies(query, type, page){
    const url = urlBuilder(query, type, page)
    const fetchRes = await fetch(url);
    return fetchRes.json();
}

// url builder for fetching the data
export function urlBuilder(query, type, page){
    return `https://www.omdbapi.com/?s=${query}&type=${type.filter}&page=${page}&apikey=81b34f15`
}


// checking if 'Enter' key was pressed
export function enterKeyCheck(e){
    return e.code === 'Enter';
}
