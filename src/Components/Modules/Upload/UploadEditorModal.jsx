import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button, Modal, Input} from 'antd';

const {TextArea} = Input;

const PreviewItemTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 1.2rem;
`;

const PreviewVideo = styled.div`
    margin-top: 1.2rem;
    border: 1px solid rgb(232, 232, 232);
`;

export default class UploadEditorModal extends Component {
    
    handleOk = () => {
        this.props.saveClickAction();
    };
    
    handleCancel = () => {
        this.props.cancelClickAction();
    };
    
    handleEditingTitle = (titleChange) => {
        this.props.changeTitleAction(titleChange);
    };
    
    handleEditingDesc = (descChange) => {
        this.props.changeDescAction(descChange);
    };
    
    render() {
        const {
            modalConfig,
            showPreviewEditor,
            editingLoading,
            previewVideoTitle ,
            previewVideoURL,
            editingTitle,
            editingDesc
        } = {...this.props};
        return (
            <Modal
                visible={showPreviewEditor}
                title={previewVideoTitle}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key='back' onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key='submit' type='primary' loading={editingLoading} onClick={this.handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <PreviewVideo>
                    <video
                        width={modalConfig.previewVideoWidth}
                        height={modalConfig.previewVideoHeight}
                        src={previewVideoURL}
                    />
                </PreviewVideo>
                <PreviewItemTitle>Title:</PreviewItemTitle>
                <Input
                    placeholder={modalConfig.titleInputPlaceholder}
                    value={editingTitle}
                    onChange={this.handleEditingTitle}
                />
                <PreviewItemTitle>Description:</PreviewItemTitle>
                <TextArea
                    placeholder={modalConfig.descInputPlaceholder}
                    value={editingDesc}
                    autoSize={modalConfig.descInputAreaSize}
                    onChange={this.handleEditingDesc}
                />
            </Modal>
        );
    }
}

UploadEditorModal.propTypes = {
    modalConfig: PropTypes.object.isRequired,
    showPreviewEditor: PropTypes.bool.isRequired,
    editingLoading: PropTypes.bool.isRequired,
    previewVideoTitle: PropTypes.string.isRequired,
    previewVideoURL: PropTypes.string.isRequired,
    editingTitle: PropTypes.string.isRequired,
    editingDesc: PropTypes.string.isRequired,
    saveClickAction: PropTypes.func.isRequired,
    cancelClickAction: PropTypes.func.isRequired,
    changeTitleAction: PropTypes.func.isRequired,
    changeDescAction: PropTypes.func.isRequired,
};
