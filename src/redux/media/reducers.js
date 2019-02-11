
import {
    FETCH_MOVIES
} from './types';

const initialState = {
    movies: {
        results: [],
        totalResults: "",
        pages: "",
        error: "",
        currentPage: ""
    }
}

const media = (state = initialState, action) => {   
    switch (action.type) {
        case FETCH_MOVIES.SUCCESS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    results: action.payload.results ? action.payload.results : '',
                    totalResults: action.payload.totalResults ? action.payload.totalResults : '',
                    pages: action.payload.pages ? action.payload.pages : '',
                    currentPage: action.payload.currentPage ? action.payload.currentPage : 1,
                    error: ""
                }
            }
            case FETCH_MOVIES.FAILURE:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    results: [],
                    totalResults: "",
                    pages: "",
                    error: "",
                    currentPage: "",
                    error: action.payload.error
                }
            }
        default:
            return state
    }
}  

export default media;                                                                                                   