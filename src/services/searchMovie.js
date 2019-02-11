import Api from '../utils/api';

class SearchMovieService {

    static searchMovie(term) {
        return Api.get(`&s=${term}`);
    }

    static searchMoviePage(term, page) {
        return Api.get(`&s=${term}&page=${page}`);
    }
}

export default SearchMovieService;