import {googleApiKey} from './ApiConfig';

const serachApi = {
    createRequest(part, maxResults, searchKey, pageToken, type, publishedAfter, publishedBefore) {
        return {
            part: part,
            maxResults: maxResults,
            q: searchKey,
            type: type,
            pageToken: pageToken,
            key: googleApiKey,
            publishedAfter: publishedAfter,
            publishedBefore: publishedBefore
        };
    },
};


export {
    serachApi
};
