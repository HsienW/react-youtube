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
    createRelatedRequest(part, type, maxResults, relatedToVideoId) {
        return {
            part: part ? part : 'snippet',
            type: type ? type : 'video',
            maxResults: maxResults ? maxResults : 10,
            relatedToVideoId: relatedToVideoId,
            key: googleApiKey,
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
    }
};

const commentApi = {
    createGetCommentRequest(part, id) {
        return {
            part: part ? part : 'replies,snippet',
            videoId: id,
            key: googleApiKey,
        };
    },
};

export {
    searchApi,
    videoApi,
    commentApi
};
