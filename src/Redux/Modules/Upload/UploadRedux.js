import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

export const UploadVideoActions = {
    doUploadVideoStart: 'DO_UPLOAD_VIDEO_START',
    doUploadVideoSuccess: 'DO_UPLOAD_VIDEO_SUCCESS',
    doUploadVideoFailed: 'DO_UPLOAD_VIDEO_FAILED',
};

export const UploadEditVideoDataActions = {
    uploadEditVideoDataStart: 'UPLOAD_EDIT_VIDEO_DATA_START',
    uploadEditVideoDataSuccess: 'UPLOAD_EDIT_VIDEO_DATA_SUCCESS',
    uploadEditVideoDataFailed: 'UPLOAD_EDIT_VIDEO_DATA_FAILED',
};

const doUploadVideo = (uploadURL, fromData, header, file) => {
    return (dispatch) => {
        dispatch(createAction(UploadVideoActions.doUploadVideoStart));
        // callApi.customPost(uploadURL, fromData, header)
        Promise.resolve({
            'kind': 'youtube#video',
            'etag': '\'j6xRRd8dTPVVptg711_CSPADRfg/vcES-S4ttIrN6xzHGJFWzCJBJKo\'',
            'id': 'sGGV5XChOMk',
            'snippet': {
                'publishedAt': '2019-11-14T09:34:33.000Z',
                'channelId': 'UC5jvFNi4xoq4ri9fb8xF8Tw',
                'title': 'unknown',
                'description': '',
                'thumbnails': {
                    'default': {
                        'url': 'https://i.ytimg.com/vi/sGGV5XChOMk/default.jpg',
                        'width': 120,
                        'height': 90
                    },
                    'medium': {
                        'url': 'https://i.ytimg.com/vi/sGGV5XChOMk/mqdefault.jpg',
                        'width': 320,
                        'height': 180
                    },
                    'high': {
                        'url': 'https://i.ytimg.com/vi/sGGV5XChOMk/hqdefault.jpg',
                        'width': 480,
                        'height': 360
                    }
                },
                'channelTitle': 'Wallace Wu',
                'categoryId': '22',
                'liveBroadcastContent': 'none',
                'localized': {
                    'title': 'unknown',
                    'description': ''
                }
            },
            'contentDetails': {
                'duration': 'PT0S',
                'dimension': '2d',
                'definition': 'sd',
                'caption': 'false',
                'licensedContent': false,
                'projection': 'rectangular',
                'hasCustomThumbnail': false
            },
            'statistics': {
                'viewCount': '0',
                'likeCount': '0',
                'dislikeCount': '0',
                'favoriteCount': '0',
                'commentCount': '0'
            }
        })
            .then((respond) => {
                console.log('tttttttttttttttttt');
                console.log(respond);
                console.log(file);
                const test = {
                    'id': respond.id,
                    'snippet': {
                        'title': file[0].title,
                        'description': file[0].description,
                        'categoryId': '22'
                    }
                };
                this.uploadEditVideoInfo(test);
                // item.title = this.state.editingTitle;
                // item.description = this.state.editingDesc;
                // dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(error));
            });
        // callApi.customPost(uploadURL, fromData, header)
        //     .then((respond) => {
        //         dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(respond));
        //     })
        //     .then((respond) => {
        //         console.log('tttttttttttttttttt');
        //         console.log(respond);
        //         console.log(file);
        //         const test = {
        //             'id': respond.id,
        //             'snippet': {
        //                 'title': file[0].title,
        //                 'description': file[0].description,
        //                 'categoryId': '22'
        //             }
        //         };
        //         uploadEditVideoInfo(test);
        //         // item.title = this.state.editingTitle;
        //         // item.description = this.state.editingDesc;
        //         // dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(respond));
        //     })
        //     .catch((error) => {
        //         dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(error));
        //     });
    };
};

const uploadEditVideoInfo = (request) => {
    return (dispatch) => {
        dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataStart));
        callApi.put(apiData.videoURLUpdate, request)
            .then((respond) => {
                console.log('bbbbbbbbbbbbbbbbbb');
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataFailed)(error));
            });
    };
};

export const UploadActionsCreator = {
    doUploadVideo,
    uploadEditVideoInfo
};

export default function UploadReducer(state = {action: ''}, action) {
    console.log('tttttttttttttttttt');
    console.log(action);
    switch (action.type) {
        case UploadVideoActions.doUploadVideoSuccess:
        case UploadVideoActions.doUploadVideoFailed:
        case UploadEditVideoDataActions.uploadEditVideoDataSuccess:
        case UploadEditVideoDataActions.uploadEditVideoDataFailed:
            return {action: action};
        
        default:
            return state;
    }
}

