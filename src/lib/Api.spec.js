import fetchMock from "fetch-mock";
import { Api } from "./Api";

describe('API Tests', () => {
    let api;
    beforeEach(() => {
        api = new Api();
    })

    describe('GET', () => {
        const getUrl = 'https://postman-echo.com/get';
        const getParams = {
            "foo": "bar",
        }

        const stringifiedUrl = 'https://postman-echo.com/get?foo=bar';
        const expectedResponse = {
            "args": getParams,
            "url": stringifiedUrl
        };

        fetchMock.get(stringifiedUrl, expectedResponse);

        it('should support GET requests', () => {
            expect(api.get).toBeDefined();
        })

        it('should accept a URL and params', async () => {
            expect(async () => await api.get(getUrl, getParams)).not.toThrow();
        })

        it('should throw if no url provided', async () => {
            await expect(api.get()).rejects.toThrow('Need to supply a string URL for request.');
        })

        it('should return an expected JS object or value', async () => {
            const actual = await api.get(getUrl, getParams);
            expect(actual).not.toBeNull();
            expect(actual).not.toBeUndefined();
            expect(actual).toEqual(expectedResponse);
        })
    })
})