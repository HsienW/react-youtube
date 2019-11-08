import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {PageDivider} from '../../Components/Modules';
import {uploadApi} from '../../ApiCenter/Api/Api';
import {Upload, Icon, Button, Modal, Input} from 'antd';
import {callApi} from '../../ApiCenter/Api/CallApi';
import * as StyleConfig from '../../Common/StyleConfig';
// import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';'

const {Dragger} = Upload;
const {TextArea} = Input;

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
        multiple: false,
        previewListType: 'picture',
    }
};

class MyUpload extends Component {
    
    state = {
        previewFileList: [],
        uploadFileList: [],
        previewVideoURL: '',
        visible: false,
        loading: false,
        editingTitle: '',
        editingDescription: ''
    };
    
    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };
    
    handleCancel = () => {
        this.setState({visible: false});
    };
    
    beforeUploadCheck = (file, fileList) => {
        const newList = fileList.map((item) => {
            item.title = item.name;
            item.desc = '';
            return item;
        });
        console.log('58585858585585');
        console.log(newList);
        // this.setState({
        //     uploadFileList: newList,
        // });
        return false;
    };
    
    previewUploadVideo = (file) => {
        console.log('fffffffffffff');
        console.log(URL.createObjectURL(file.originFileObj));
        this.setState({
            visible: true,
            editingTitle: file.title,
            editingDescription: file.desc,
            previewVideoURL: URL.createObjectURL(file.originFileObj)
        });
    };
    
    doUpload = () => {
        const file = this.state.uploadFileList;
        const formData = new FormData();
        const header = {
            'Content-Type': 'multipart/form-data'
        };
        formData.append('multipartFile', file[0]);
        callApi.post(uploadApi.getUploadVideoURL(), formData, header);
    };
    
    onChange = ({target: {value}}) => {
        this.setState({value});
    };
    
    render() {
        console.log('render-render-render-render');
        return (
            <div>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Dragger
                            name={uploaderConfigData.dragger.fileName}
                            multiple={uploaderConfigData.dragger.multiple}
                            listType={uploaderConfigData.dragger.previewListType}
                            // action={uploadApi.getUploadVideoURL()}
                            beforeUpload={this.beforeUploadCheck}
                            onPreview={this.previewUploadVideo}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type={uploaderConfigData.icon.type} style={uploaderConfigData.icon.style}/>
                            </p>
                            <p className="ant-upload-text">{uploaderConfigData.title}</p>
                            <p className="ant-upload-hint">{uploaderConfigData.description}</p>
                        </Dragger>
                    </UploaderArea>
                    <Button onClick={this.doUpload}>DoUpload</Button>
                </MyUploadView>
                <Modal
                    visible={this.state.visible}
                    title={this.state.editingTitle}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <video width="320" height="240" src={this.state.previewVideoURL}/>
                    <div>Title:</div>
                    <Input placeholder="Basic usage" />
                    <div style={{margin: '24px 0'}}/>
                    <div>Description:</div>
                    <TextArea
                        value={this.state.editingDescription}
                        onChange={this.onChange}
                        placeholder="Controlled autosize"
                        autoSize={{minRows: 3, maxRows: 5}}
                    />
                </Modal>
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
