export const MOVIE_TYPE_TO_FILTER_VALUE = [
    { title: 'Any', filter: '' },
    { title: 'Movies', filter: 'movie' },
    { title: 'Series', filter: 'series' },
    { title: 'Episodes', filter: 'episode' }
]
export const MESSAGES = {
    initial: 'Please, make a search',
    select: 'Please, select the movie to see the details'
}
export const MIN_YEAR_VALUE = 1892;
export const MAX_YEAR_VALUE = new Date().getFullYear();
export const LOCAL_STORAGE_KEY = 'homeState'