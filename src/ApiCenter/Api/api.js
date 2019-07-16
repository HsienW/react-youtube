const basicURL = 'https://www.googleapis.com/youtube/v3/';
const googleApiKey = 'AIzaSyAL3Tp-ilQSP2XDVn0qljXjj5UO801WeOA';

const activitiesURL = `${basicURL}activities?`;
const videoURL = `${basicURL}videos?`;
const channelURL = `${basicURL}channels?`;
const commentURL = `${basicURL}comments?`;
const playListURL = `${basicURL}playlists?`;
const searchURL = `${basicURL}search?`;
const subscriptionURL = `${basicURL}subscriptions?`;

const serachApi = {
    createRequest(part, maxResults, type, publishedAfter, publishedBefore) {
        return {
            part: part,
            maxResults: maxResults,
            q: this.state.searchKey,
            type: type,
            pageToken: this.state.nextPageToken,
            key: googleApiKey,
            publishedAfter: publishedAfter,
            publishedBefore: publishedBefore
        };
    },
};


export {
    googleApiKey,
    activitiesURL,
    videoURL,
    channelURL,
    commentURL,
    playListURL,
    searchURL,
    subscriptionURL,
    serachApi
};
