import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PlayActionsCreator} from '../../Redux/Modules/Play/PlayRedux';
import {PlayRedux} from '../../Redux/Modules';
import {Header, VideoDetail, VideoCommentList, VideoRelatedList} from '../../Components/Layout/index';
import {VideoPlayer} from '../../Components/Modules';

const PlayView = styled.div`
    width: 100%;
    height: 90vh;
    padding: 2% 8% 0 8%;
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

class Play extends Component {
    
    constructor(props) {
        super(props);
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
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case PlayRedux.PlayVideoActions.getPlayVideoSuccess:
                return {getVideoDataStatus: true, playVideoData: nextProps.action.payload};
            
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
                                    playerData={this.state.playVideoData}
                                    playerConfig={playerConfig}
                                    playerInlineConfig={playerInlineConfig}
                                />
                                <VideoDetail videoDetailData={this.state.playDetailData}/>
                                <VideoCommentList commentListData={this.state.playCommentData}/>
                            </PlayInfo>
                            <VideoRelatedList
                                videoRelatedData={this.state.playRelatedData}
                                videoListItemConfig={videoListItemConfig}
                            />
                        </PlayView>
                        : <div>No-Data</div>
                }
            </div>
        );
    }
}

Play.propTypes = {
    PlayActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.PlayReducer.action};
    },
    (dispatch) => {
        return {
            PlayActionsCreator: bindActionCreators(PlayActionsCreator, dispatch),
        };
    }
)(Play);