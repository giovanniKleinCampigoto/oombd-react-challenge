import Api from '../utils/api';

class SearchMovieService {

    static searchMovie(term) {
        return Api.get(`&s=${term}`);
    }
}

export default SearchMovieService;