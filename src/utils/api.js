import axios from 'axios';

const BASE_URL = "http://www.omdbapi.com/?apikey=e7308f24"

class Api {
    static get(uri) {
        return axios.get(`${BASE_URL}${uri}`)
    }    
}

export default Api;