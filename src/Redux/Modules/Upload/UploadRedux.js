import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {uploadApi} from '../../../ApiCenter/Api/Api';
import {uploadVideoSimulation, editVideoSimulation} from '../../../ApiCenter/Api/ApiSimulation';
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

export const ForceUpdateUploadActions = {
    forceUpdateUpload: 'FORCE_UPDATE_UPLOAD',
};

const uploadVideo = (uploadURL, fromData, header) => {
    return callApi.customPost(uploadURL, fromData, header)
        .then((respond) => {
            return respond;
        })
        .catch((error) => {
            return error;
        });
};

const editVideoInfo = (request) => {
    return callApi.put(apiData.videoURLUpdate, request)
        .then((respond) => {
            return respond;
        })
        .catch((error) => {
            return error;
        });
};

const uploadEditVideoInfo = (request) => {
    return (dispatch) => {
        dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataStart));
        callApi.put(apiData.videoURLUpdate, request)
            .then((respond) => {
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataFailed)(error));
            });
    };
};

const doUploadVideo = (uploadFileList) => {
    return (dispatch) => {
        dispatch(createAction(UploadVideoActions.doUploadVideoStart)());
        
        let uploadFilePromises = [];
        
        uploadFileList.forEach((uploadFileItem) => {
            const uploadItemPromise = new Promise((resolve, reject) => {
                const uploadVideoURL = uploadApi.getUploadVideoURL();
                const file = [uploadFileItem];
                const blobFile = new Blob(file, {'type': 'video/mp4'});
                const formData = new FormData();
                const header = {'Content-Type': 'video/mp4'};
                
                formData.append('file', blobFile);
    
                uploadVideo(uploadVideoURL, formData, header)
                    .then((respond) => {
                        return respond;
                    })
                    .then((uploadVideoRespond) => {
                        const editRequest = {
                            'id': uploadVideoRespond.data.id,
                            'snippet': {
                                'title': file[0].name,
                                'description': file[0].description,
                                'categoryId': '22'
                            }
                        };
                        editVideoInfo(editRequest)
                            .then((successRespond) => {
                                resolve(successRespond);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
            uploadFilePromises.push(uploadItemPromise);
        });
        
        Promise.all(uploadFilePromises)
            .then((allSuccessRespond) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(allSuccessRespond));
            })
            .catch((allError) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(allError));
            });
    };
};

const simulationDoUploadVideo = (uploadFileList) => {
    return (dispatch) => {
        dispatch(createAction(UploadVideoActions.doUploadVideoStart)());
    
        let uploadFilePromises = [];

        uploadFileList.forEach((uploadFileItem) => {
            const uploadItemPromise = new Promise((resolve, reject) => {
                const file = [uploadFileItem];
                const blobFile = new Blob(file, {'type': 'video/mp4'});
                const formData = new FormData();

                formData.append('file', blobFile);
    
                uploadVideoSimulation()
                    .then((uploadVideoRespond) => {
                        return uploadVideoRespond;
                    })
                    .then((editVideoRespond) => {
                        console.log(editVideoRespond);
                        editVideoSimulation()
                            .then((successRespond) => {
                                resolve(successRespond);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
                
            });
            uploadFilePromises.push(uploadItemPromise);
        });
    
        Promise.all(uploadFilePromises)
            .then((allSuccessRespond) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(allSuccessRespond));
            })
            .catch((allError) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(allError));
            });
    };
};

const uploadVideoForceUpdate = () => {
    return (dispatch) => {
        dispatch(createAction(ForceUpdateUploadActions.forceUpdateUpload)());
    };
};

export const UploadActionsCreator = {
    doUploadVideo,
    simulationDoUploadVideo,
    uploadEditVideoInfo,
    uploadVideoForceUpdate
};

export default function UploadReducer(state = {action: ''}, action) {
    switch (action.type) {
        case UploadVideoActions.doUploadVideoStart:
        case UploadVideoActions.doUploadVideoSuccess:
        case UploadVideoActions.doUploadVideoFailed:
        case UploadEditVideoDataActions.uploadEditVideoDataSuccess:
        case UploadEditVideoDataActions.uploadEditVideoDataFailed:
        case ForceUpdateUploadActions.forceUpdateUpload:
            return {action: action};
        
        default:
            return state;
    }
}

