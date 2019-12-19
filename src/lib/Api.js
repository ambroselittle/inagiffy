import qs from "query-string";

export class Api {

    constructor(apiRoot = '') {
        this.apiRoot = !apiRoot.endsWith('/') ? apiRoot + '/' : apiRoot;
    }

    apiUrl = path => {
        return /^https?:/i.test(path) ? path : `${this.apiRoot}${path.startsWith('/') ? path.slice(1) : path}`;
    }

    validateUrl = url => {
        if (!url || typeof url !== 'string') {
            throw new Error('Need to supply a string URL for request.');
        }
    }

    sendRequest = async (verb, url, data) => {
        let response = null;

        try {
            const requestPath = this.apiUrl(url);
            response = await fetch(requestPath, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                method: verb,
                body: !data
                    ? null
                    : typeof data === "string"
                        ? data
                        : JSON.stringify(data)
            });

            const responseBody = await response.json();
            if (!response.ok) {
                console.error(
                    `Problem processing request. Status: ${response.status} - ${
                    response.statusText
                    }`,
                    responseBody
                );
            }
            return responseBody;
        } catch (ex) {
            let message = "Unexpected error fetching API response.";
            if (!response) {
                message += " Couldn't get a response from API. Is it running?";
            }
            console.error(message, ex);
        }
    }

    get = async (url, params) => {
        this.validateUrl(url);
        const current = qs.parseUrl(url);
        const newParams = {
            ...current.query,
            ...params,
        };

        const newUrl = current.url + '?' + qs.stringify(newParams);

        return await this.sendRequest("GET", newUrl);
    }

}

