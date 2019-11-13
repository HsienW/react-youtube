import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {PageDivider} from '../../Components/Modules';
import {uploadApi} from '../../ApiCenter/Api/Api';
import {Button} from 'antd';
import {Uploader, UploadEditorModal} from '../../Components/Modules';
import * as StyleConfig from '../../Common/StyleConfig';
import axios from 'axios';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';

const MyUploadView = styled.div`
    padding: 7vh 8vw 0 8vw;
    height: 100vh;
    width: 100%;
`;

const UploaderArea = styled.div`
    padding: 0 10vw;
    height: 40vh;
`;

const uploadDividerData = {
    title: 'Upload Video'
};

const uploaderConfigData = {
    title: 'Click or drag file to this area to upload',
    description: 'Support for a single or bulk video upload.',
    icon: {
        type: 'plus',
        style: {
            color: StyleConfig.MainColor
        }
    },
    dragger: {
        fileName: 'file',
        multiple: true,
        previewListType: 'picture',
    }
};
const editorModalConfigData = {
    previewVideoWidth: 472,
    previewVideoHeight: 392,
    titleInputPlaceholder: 'Please enter new video title',
    descInputPlaceholder: 'Please enter new video description',
    descInputAreaSize: {
        minRows: 3,
        maxRows: 5
    }
};

class MyUpload extends Component {
    
    constructor() {
        super();
        this.state = {
            previewFileList: [],
            uploadFileList: [],
            previewVideoKey: '',
            previewVideoURL: '',
            previewVideoTitle: '',
            previewVideoDesc: '',
            editingTitle: '',
            editingDesc: '',
            showPreviewEditor: false,
            editingLoading: false,
        };
    }
    
    uploadListStateSync = (files) => {
        this.setState({
            uploadFileList: [...files.fileList]
        });
    };
    
    beforeUploadCheck = (file, fileList) => {
        this.setState({uploadFileList: fileList});
    };
    
    previewUploadVideo = (file) => {
        console.log('nnnnnnnnnnnnnnnnnnnnnnnn');
        console.log(file);
        this.setState({
            previewVideoKey: file.uid,
            previewVideoTitle: file.name,
            previewVideoDesc: file.description,
            previewVideoURL: URL.createObjectURL(file.originFileObj),
            showPreviewEditor: true,
        });
    };
    
    onEditingTitleChange = (titleChange) => {
        this.setState({editingTitle: titleChange.target.value});
    };
    
    onEditingDescChange = (descChange) => {
        this.setState({editingDesc: descChange.target.value});
    };
    
    onSaveEditing = () => {
        this.setState({
            editingLoading: true,
            previewVideoTitle: this.state.editingTitle,
            previewVideoDesc: this.state.editingDesc,
        }, () => {
            let newFileList = this.state.uploadFileList.slice(0);
            newFileList.map((item) => {
                if (item.uid === this.state.previewVideoKey) {
                    item.name = this.state.editingTitle;
                    item.title = this.state.editingTitle;
                    item.description = this.state.editingDesc;
                }
            });
            this.setState({
                uploadFileList: newFileList,
                previewVideoKey: '',
                previewVideoURL: '',
                previewVideoTitle: '',
                previewVideoDesc: '',
                editingTitle: '',
                editingDesc: '',
                editingLoading: false,
                showPreviewEditor: false,
            });
        });
    };
    
    onCancelEditing = () => {
        this.setState({
            previewVideoKey: '',
            previewVideoURL: '',
            previewVideoTitle: '',
            previewVideoDesc: '',
            editingTitle: '',
            editingDesc: '',
            editingLoading: false,
            showPreviewEditor: false,
        });
    };
    
    doUpload = () => {
        const file = this.state.uploadFileList;
        const blobFile = new Blob(file, {'type': 'video/mp4'});
        const formData = new FormData();
    
        const header = {
            'Authorization': `Bearer ${WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN)}`,
            'Content-Type': 'video/mp4'
        };
        const config = {
            'snippet': {
                'title': 'test',
                'description': 'description-description',
                'tags': [],
                'categoryId': '22'
            },
            'status': {
                'privacyStatus': 'public'
            }
        };
        
        formData.append('file', blobFile);
        formData.append('uploadType', 'resumable');
        formData.append('part', JSON.stringify(config));
        formData.append('key', 'AIzaSyAL3Tp-ilQSP2XDVn0qljXjj5UO801WeOA');
        
        axios.post(uploadApi.getUploadVideoURL(), formData, header);
        // callApi.post(uploadApi.getUploadVideoURL(), formData, header);
    };
    
    render() {
        return (
            <div>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Uploader
                            uploaderConfig={uploaderConfigData}
                            uploadFileList={this.state.uploadFileList}
                            stateSyncAction={this.uploadListStateSync}
                            beforeUploadAction={this.beforeUploadCheck}
                            previewUploadAction={this.previewUploadVideo}
                        />
                    </UploaderArea>
                    <Button onClick={this.doUpload}>DoUpload</Button>
                </MyUploadView>
                <UploadEditorModal
                    modalConfig={editorModalConfigData}
                    showPreviewEditor={this.state.showPreviewEditor}
                    editingLoading={this.state.editingLoading}
                    previewVideoTitle={this.state.previewVideoTitle}
                    previewVideoURL={this.state.previewVideoURL}
                    editingTitle={this.state.editingTitle}
                    editingDesc={this.state.editingDesc}
                    saveClickAction={this.onSaveEditing}
                    cancelClickAction={this.onCancelEditing}
                    changeTitleAction={this.onEditingTitleChange}
                    changeDescAction={this.onEditingDescChange}
                />
            </div>
        );
    }
}

MyUpload.propTypes = {
    UploadActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.UploadReducer.action};
    },
    (dispatch) => {
        return {
            UploadActionsCreator: bindActionCreators(UploadRedux.UploadActionsCreator, dispatch)
        };
    }
)(MyUpload);
