import {googleApiKey} from './ApiConfig';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';

const homeApi = {
    createRecommendRequest(part, mine, accessToken, maxResults, chart, videoId) {
        return {
            part: part ? part : 'snippet,contentDetails',
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 20,
            chart: chart ? chart : 'mostPopular',
            id: videoId ? videoId : ''
        };
    }
};

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
    createPlayVideoRequest(part, mine, accessToken, maxResults, chart, videoId) {
        return {
            part: part ? part : 'snippet,contentDetails',
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 1,
            id: videoId ? videoId : ''
        };
    },
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
    homeApi,
    searchApi,
    videoApi,
    commentApi
};
