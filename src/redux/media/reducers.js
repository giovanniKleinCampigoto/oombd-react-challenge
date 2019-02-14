
import {
    FETCH_MOVIES,
    SET_CURRENT_PAGE,
    SET_PAGE_RESULTS,
    SET_SINGLE_MEDIA,
    SET_INITIAL_MEDIA
} from './types';

const initialState = {
    movies: {
        results: [],
        totalResults: "",
        pages: "",
        error: "",
        currentPage: "",
        currentTerm: ""
    },
    singleMedia: "",
    singleMediaTrailer: "",
    initialMedia: []
}

const media = (state = initialState, action) => {   
    switch (action.type) {  
        case SET_INITIAL_MEDIA.SUCCESS:
            return {
                ...state,
                initialMedia: action.payload.initialMedia
            }     
        case SET_SINGLE_MEDIA.SUCCESS:
            return {
                ...state,
                singleMedia: action.payload.singleMedia,
                singleMediaTrailer: action.payload.singleMediaTrailer
            }
        case SET_PAGE_RESULTS.SUCCESS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    results: action.payload.results
                }
            }
        case SET_CURRENT_PAGE.SUCCESS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    currentPage: action.payload.currentPage
                }
            }
        case FETCH_MOVIES.SUCCESS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    results: action.payload.results ? action.payload.results : [],
                    totalResults: action.payload.totalResults ? action.payload.totalResults : '',
                    pages: action.payload.pages ? action.payload.pages : '',
                    currentPage: action.payload.currentPage ? action.payload.currentPage : 1,
                    error: "",
                    currentTerm: action.payload.currentTerm ? action.payload.currentTerm : "",
                    pageResults: action.payload.pageResults ? action.payload.pageResults : []
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
                        currentPage: "",
                        error: action.payload.error,
                        currentTerm: "",
                        pageResults: []
                    }
                }
        default:
            return state
    }
}  

export default media;                                                                                                   