import {googleApiKey} from './ApiConfig';

const searchApi = {
    createRequest(part, maxResults, searchKey, pageToken, type, publishedAfter) {
        return {
            part: part,
            maxResults: maxResults ? maxResults : 10,
            q: searchKey,
            type: type,
            pageToken: pageToken,
            key: googleApiKey,
            publishedAfter: publishedAfter
        };
    },
};

const videoApi = {
    createDetailRequest(part, id) {
        return {
            part: part ? part : 'snippet,contentDetails,statistics',
            id: id,
            key: googleApiKey,
        };
    },
};



export {
    searchApi,
    videoApi
};
