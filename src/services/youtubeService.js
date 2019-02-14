import YoutubeApi from '../utils/youtubeApi';

class SearchMovieTrailer {

    static searchMovieInfo(term) {
        return YoutubeApi.getInfo(`?part=snippet&q=${encodeURIComponent(term)}&maxResults=1`);
    }

    static getMovieVideo(id) {
        return YoutubeApi.getVideo(`?id=${encodeURIComponent(id)}&part=player`);
    }
}

export default SearchMovieTrailer;