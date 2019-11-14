const basicURL = 'https://www.googleapis.com/youtube/v3/';
const googleApiKey = 'AIzaSyAL3Tp-ilQSP2XDVn0qljXjj5UO801WeOA';

const activitiesURL = `${basicURL}activities?`;
const videoURL = `${basicURL}videos?`;
const channelURL = `${basicURL}channels?`;
const commentURL = `${basicURL}commentThreads?`;
const playListURL = `${basicURL}playlists?`;
const playlistItemsURL = `${basicURL}playlistItems?`;
const searchURL = `${basicURL}search?`;
const subscriptionURL = `${basicURL}subscriptions?`;
const uploadURL = 'https://www.googleapis.com/upload/youtube/v3/videos?';
const videoURLUpdate = `${basicURL}videos?part=snippet,status,contentDetails`;


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
