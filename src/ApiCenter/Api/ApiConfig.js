import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';

const basicURL = 'https://www.googleapis.com/youtube/v3/';
const googleApiKey = 'AIzaSyAQAfX5iYUPP5miusu3lieWrubIi_qS9dA';

const activitiesURL = `${basicURL}activities?`;
const videoURL = `${basicURL}videos?`;
const channelURL = `${basicURL}channels?`;
const commentURL = `${basicURL}commentThreads?`;
const playListURL = `${basicURL}playlists?`;
const playlistItemsURL = `${basicURL}playlistItems?`;
const searchURL = `${basicURL}search?`;
const subscriptionURL = `${basicURL}subscriptions?`;
const uploadURL = 'https://www.googleapis.com/upload/youtube/v3/videos?';
const videoURLUpdate = `${basicURL}videos?part=snippet,status,contentDetails&access_token=${WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN)}`;


export {
    googleApiKey,
    activitiesURL,
    videoURL,
    channelURL,
    commentURL,
    playListURL,
    playlistItemsURL,
    searchURL,
    subscriptionURL,
    uploadURL,
    videoURLUpdate
};
