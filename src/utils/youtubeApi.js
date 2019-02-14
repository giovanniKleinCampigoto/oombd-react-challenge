
import axios from 'axios';
const BASE_URL_INFO = 'https://www.googleapis.com/youtube/v3/search'
const BASE_URL_VIDEO = 'https://www.googleapis.com/youtube/v3/videos'

const API_KEY = '&key=AIzaSyArs_KfgD9o2Y33eTGGNdImfkE5WnOksmo';

class YoutubeAPI {
    static getInfo (uri) {
        return axios.get(`${BASE_URL_INFO}${uri}${API_KEY}`);
    }

    static getVideo (uri) {
        return axios.get(`${BASE_URL_VIDEO}${uri}${API_KEY}`);
    }
}

export default YoutubeAPI;