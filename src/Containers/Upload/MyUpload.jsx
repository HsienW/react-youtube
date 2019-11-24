import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {PageDivider} from '../../Components/Modules';
import {LoadingDataHOC} from '../../Decorators/index';
import {Button} from 'antd';
import {Uploader, UploadEditorModal, TextAlert} from '../../Components/Modules';
import {ActionAlert} from '../../Components/Layout';
import * as StyleConfig from '../../Common/StyleConfig';

const MyUploadView = styled.div`
    padding: 7vh 8vw 0 8vw;
    height: 100vh;
    width: 100%;
`;

const UploaderArea = styled.div`
    padding: 0 10vw;
    height: 40vh;
`;

const UploaderControlArea = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const uploadDividerData = {
    title: 'Upload Video'
};

const uploaderConfigData = {
    title: 'Click or drag file to this area to upload',
    description: 'Support for a single or bulk video upload, bulk upload videos, limited to three per upload.',
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

const TextAlertConfigData = {
    configData: {
        type: 'warning',
        margin: '8px 0 0'
    },
    contentData: {
        title: 'Warning',
        description: 'The number of videos uploaded at one time cannot be greater than three. Please try again!'
    }
};

@LoadingDataHOC
class MyUpload extends Component {
    
    constructor() {
        super();
        this.state = {
            uploadFileList: [],
            uploadFileId: '',
            editInfoFileList: [],
            previewFileList: [],
            previewVideoKey: '',
            previewVideoURL: '',
            previewVideoTitle: '',
            previewVideoDesc: '',
            editingTitle: '',
            editingDesc: '',
            uploadFileLoading: false,
            showPreviewEditor: false,
            showUploadControlBtn: false,
            showAlert: false,
            showOverloadAlert: false
        };
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case UploadRedux.UploadVideoActions.doUploadVideoStart:
                return {
                    uploadFileLoading: true
                };
            case UploadRedux.UploadVideoActions.doUploadVideoSuccess:
                return {
                    uploadFileList: []
                };
            default:
                break;
        }
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.uploadFileLoading && prevState.uploadFileLoading) {
            this.props.UploadActionsCreator.uploadVideoForceUpdate();
            this.props.toggleShowLoading(false);
        }
    }
    
    uploadListStateSync = (files) => {
        if (files.fileList.length > 3) {
            this.setState({
                showOverloadAlert: true,
                showUploadControlBtn: false,
                uploadFileList: []
            });
            return;
        }
        
        if (files.fileList.length === 0) {
            this.setState({
                showOverloadAlert: false,
                showUploadControlBtn: false,
                uploadFileList: []
            });
            return;
        }
        
        this.setState({
            showOverloadAlert: false,
            showUploadControlBtn: true,
            uploadFileList: [...files.fileList]
        });
    };
    
    beforeUploadCheck = (file, fileList) => {
        fileList.map((item) => {
            return item.description = '';
        });
        this.setState({uploadFileList: fileList});
    };
    
    previewUploadVideo = (file) => {
        this.setState({
            previewVideoKey: file.uid,
            previewVideoTitle: file.name,
            previewVideoDesc: file.description,
            previewVideoURL: URL.createObjectURL(file.originFileObj),
            showPreviewEditor: true
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
        this.setState({
            uploadFileLoading: true,
        }, () => {
            this.props.toggleShowLoading(this.state.uploadFileLoading);
            this.props.UploadActionsCreator.simulationDoUploadVideo(this.state.uploadFileList);
            // this.props.UploadActionsCreator.doUploadVideo(this.state.uploadFileList);
        });
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
                        {
                            this.state.showOverloadAlert
                                ? <TextAlert
                                    configData={TextAlertConfigData.configData}
                                    contentData={TextAlertConfigData.contentData}
                                />
                                : null
                        }
                        {
                            this.state.showUploadControlBtn
                                ? <UploaderControlArea>
                                    <Button
                                        type="primary"
                                        size='large'
                                        icon="upload"
                                        style={{margin: '8px 0 0'}}
                                        onClick={this.doUpload}
                                    >
                                        Upload
                                    </Button>
                                </UploaderControlArea>
                                : null
                        }
                    </UploaderArea>
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
                <ActionAlert/>
            </div>
        );
    }
}

MyUpload.propTypes = {
    UploadActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func
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
