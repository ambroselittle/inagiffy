import { Api } from "./Api";

const GIPHY_ROOT = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_KEY = process.env.REACT_APP_GIFFY_API_KEY || '';
const SEARCH_RESULT_LIMIT = 25;
const TRENDING_RESULT_LIMIT = SEARCH_RESULT_LIMIT;

export class GiphyApi extends Api {
    constructor() {
        super(GIPHY_ROOT);
    }

    getSearchPath = (searchText, offset = 0) => `search?api_key=${GIPHY_API_KEY}&q=${searchText}&limit=${SEARCH_RESULT_LIMIT}&offset=${offset}&rating=G&lang=en`;

    getTrending = async (offset = 0) => {
        return this.get('trending', {
            api_key: GIPHY_API_KEY,
            limit: TRENDING_RESULT_LIMIT,
            offset,
            rating: 'G',
        })
    }

    search = async (searchText, offset = 0) => {
        return this.get('search', {
            api_key: GIPHY_API_KEY,
            q: searchText,
            limit: SEARCH_RESULT_LIMIT,
            offset,
            rating: 'G',
            lang: 'en',
        })
    }


}
