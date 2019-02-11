import Api from '../utils/api';

class SearchMovieService {

    static searchMovie(term) {
        return Api.get(`&s=${term}`);
    }

    static searchMoviePage(term, page) {
        return Api.get(`&s=${term}&page=${page}`);
    }

    static searhMovieDetails(title) {
        return Api.get(`&t=${title}`);
    }
}

export default SearchMovieService;