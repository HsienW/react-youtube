import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, PlayRedux} from '../../Redux/Modules';
import {CheckAuthHOC} from '../../Decorators/index';
import {Header, VideoDetail, VideoCommentList, VideoRelatedList} from '../../Components/Layout/index';
import {VideoPlayer} from '../../Components/Modules';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {videoApi, commentApi, searchApi} from '../../ApiCenter/Api/Api';
import {formatCurry, formatItem} from '../../Common/BasicService';
import {Spin} from 'antd';
import {SpinStyle} from '../../Common/StyleConfig';

const PlayView = styled.div`
    width: 100%;
    height: 90vh;
    padding: 9vh 8vw 0 8vw;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const PlayInfo = styled.div`
    width: 70%;
    min-width: 640px;
    min-height: 600px;
`;

const playerConfig = {
    width: '100%',
    height: '66vh',
    defaultControls: false,
    showControl: true,
    defaultPlay: true,
    mute: false
};

const playerInlineConfig = {
    minWidth: '640px',
    minHeight: '360px'
};

const videoListItemConfig = {
    width: '100%',
    height: '90px',
    marginBottom: '2%',
    imgWidth: 120,
    assignedListItem: 'related-video-list-item'
};

@CheckAuthHOC
class Play extends Component {
    
    constructor() {
        super();
        this.state = {
            getVideoDataStatus: false,
            getDetailDataStatus: false,
            getCommentDataStatus: false,
            getRelatedDataStatus: false,
            playVideoData: {},
            playDetailData: {},
            playCommentData: {},
            playRelatedData: {}
        };
    }
    
    componentDidMount() {
        this.getPlayAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case PlayRedux.PlayVideoActions.getPlayVideoSuccess:
                return {getVideoDataStatus: true, playVideoData: nextProps.action.payload.data.items};
            
            case PlayRedux.PlayDetailActions.getPlayDetailSuccess:
                return {getDetailDataStatus: true, playDetailData: nextProps.action.payload.data.items[0]};
            
            case PlayRedux.PlayCommentActions.getPlayCommentSuccess:
                return {getCommentDataStatus: true, playCommentData: nextProps.action.payload.data};
            
            case PlayRedux.PlayRelatedActions.getPlayRelatedSuccess:
                return {getRelatedDataStatus: true, playRelatedData: nextProps.action.payload.data};
            
            default:
                break;
        }
        
        return null;
    }
    
    getPlayAllData = () => {
        const getVideoItemInfo = WebStorage.getSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO);
        const videoPlayRequest = videoApi.createPlayVideoRequest(
            '',
            '',
            '',
            1,
            '',
            formatCurry.objToParse(getVideoItemInfo).id
        );
        const detailRequest = videoApi.createDetailRequest('', formatCurry.objToParse(getVideoItemInfo).id);
        const commentRequest = commentApi.createGetCommentRequest('', formatCurry.objToParse(getVideoItemInfo).id);
        const relatedRequest = searchApi.createRelatedRequest('', 'video', 20, formatCurry.objToParse(getVideoItemInfo).id);
        
        this.props.PlayActionsCreator.getPlayVideoData(videoPlayRequest);
        this.props.PlayActionsCreator.getPlayDetailData(detailRequest);
        this.props.PlayActionsCreator.getPlayCommentData(commentRequest);
        this.props.PlayActionsCreator.getPlayRelatedData(relatedRequest);
    };
    
    relatedListItemClick = (clickItemInfo) => {
        const relatedListItemInfo = formatItem.selectVideoListItemInfo(clickItemInfo);
        WebStorage.setSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO, formatCurry.objToStringify(relatedListItemInfo));
        this.setState({
            getVideoDataStatus: false,
            getDetailDataStatus: false,
            getCommentDataStatus: false,
            getRelatedDataStatus: false,
            playVideoData: {},
            playDetailData: {},
            playCommentData: {},
            playRelatedData: {}
        }, () => {
            this.getPlayAllData();
        });
    };
    
    render() {
        return (
            <div>
                <Header/>
                {
                    this.state.getVideoDataStatus
                    && this.state.getDetailDataStatus
                    && this.state.getCommentDataStatus
                    && this.state.getRelatedDataStatus
                        ? <PlayView>
                            <PlayInfo>
                                <VideoPlayer
                                    playerData={formatItem.playVideoItemInfo(this.state.playVideoData)}
                                    playerConfig={playerConfig}
                                    playerInlineConfig={playerInlineConfig}
                                />
                                <VideoDetail videoDetailData={this.state.playDetailData}/>
                                <VideoCommentList commentListData={this.state.playCommentData}/>
                            </PlayInfo>
                            <VideoRelatedList
                                videoRelatedData={this.state.playRelatedData}
                                videoListItemConfig={videoListItemConfig}
                                itemClickAction={this.relatedListItemClick}
                            />
                        </PlayView>
                        : <PlayView>
                            <Spin size='large' style={SpinStyle}/>
                        </PlayView>
                }
            </div>
        );
    }
}

Play.propTypes = {
    history: PropTypes.object.isRequired,
    PlayActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func
};

export default connect(
    (state) => {
        return {action: state.PlayReducer.action};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            PlayActionsCreator: bindActionCreators(PlayRedux.PlayActionsCreator, dispatch),
        };
    }
)(Play);