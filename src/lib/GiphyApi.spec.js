import fetchMock from "fetch-mock";
import { GiphyApi } from "./GiphyApi";

describe('GIPHY API Tests', () => {
    let api;
    beforeEach(() => {
        api = new GiphyApi();
    })

    describe('Trending', () => {
        const expectedResponse = { item: '1' };

        it('should support getting trending', () => {
            expect(api.getTrending).toBeDefined();
        })

        it('should accept and use numeric offset', async () => {
            fetchMock.get('https://api.giphy.com/v1/gifs/trending?api_key=myTestApiKey&limit=25&offset=23&rating=G', expectedResponse);
            expect(async () => await api.getTrending(23)).not.toThrow();
        })

        it('should return a list of trending items', async () => {
            fetchMock.get('https://api.giphy.com/v1/gifs/trending?api_key=myTestApiKey&limit=25&offset=0&rating=G', expectedResponse);
            const actual = await api.getTrending();
            expect(actual).toEqual(expectedResponse);
        })
    })

    describe('Search', () => {
        const expectedResponse = { item: '1' };
        const offset = 23;
        const searchText = 'fry eyes';

        it('should support searches', () => {
            expect(api.search).toBeDefined();
        })

        it('should accept and use expected params', async () => {
            // query-string seems to alphabetize the params, and they have to match in order the stringified url for fetchMock
            fetchMock.get(`https://api.giphy.com/v1/gifs/search?api_key=myTestApiKey&lang=en&limit=25&offset=${offset}&q=${searchText}&rating=G`, expectedResponse);
            await expect(api.search(searchText, offset)).resolves.not.toThrow();
        })

        it('should return a list of trending items', async () => {
            fetchMock.get(`https://api.giphy.com/v1/gifs/search?api_key=myTestApiKey&lang=en&limit=25&offset=0&q=${searchText}&rating=G`, expectedResponse);
            const actual = await api.search(searchText);
            expect(actual).toEqual(expectedResponse);
        })
    })

})