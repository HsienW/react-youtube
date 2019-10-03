import {googleApiKey} from './ApiConfig';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';

const headerApi = {
    createSubscribeRequest(part, mine, maxResults, accessToken) {
        return {
            part: part ? part : 'snippet,contentDetails',
            mine: mine ? mine : true,
            maxResults: maxResults ? maxResults : 5,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
        };
    }
};

const homeApi = {
    createRecommendRequest(part, mine, accessToken, maxResults, chart) {
        return {
            part: part ? part : 'snippet,contentDetails',
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 20,
            chart: chart ? chart : 'mostPopular',
        };
    }
};

const channelApi = {
    createMyChannelRequest(part, mine, accessToken, maxResults) {
        return {
            part: part ? part : 'snippet,contentDetails,statistics',
            maxResults: maxResults ? maxResults : 20,
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
        };
    },
    createProfileChannelRequest(part, mine, accessToken) {
        return {
            part: part ? part : 'contentDetails',
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
        };
    },
    createMyUploadListRequest(part, userUploadId, accessToken, maxResults) {
        return {
            part: part ? part : 'snippet,contentDetails,status,id',
            id: userUploadId ? userUploadId : WebStorage.getSessionStorage(WebStorageKeys.USER_PROFILE_UPLOAD_LIST_ID),
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 5,
        };
    },
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
    createMyLikeVideoListRequest(part, myRating, accessToken, maxResults) {
        return {
            part: part ? part : 'snippet,contentDetails,statistics',
            myRating: myRating ? myRating : 'like',
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 5,
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

const playListApi = {
    createMyPlayListRequest(part, mine, accessToken, maxResults) {
        return {
            part: part ? part : 'snippet,contentDetails',
            mine: mine ? mine : true,
            access_token: accessToken ? accessToken : WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            maxResults: maxResults ? maxResults : 5,
        };
    },
};

export {
    homeApi,
    headerApi,
    channelApi,
    searchApi,
    videoApi,
    commentApi,
    playListApi
};
