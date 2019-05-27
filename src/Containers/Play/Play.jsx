import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PlayActionsCreator} from '../../Redux/Modules/Play/PlayRedux';
import {PlayRedux} from '../../Redux/Modules';
import {Header} from '../../Components/Layout/index';
import {VideoPlayer, VideoDescription, VideoListItem, UserAvatar} from '../../Components/Modules';

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

const RelatedVideo = styled.div`
    width: 30%;
    padding: 0 1%;
    min-width: 360px;
    min-height: 600px;
    max-height: 100%;
    overflow: auto;
`;

const PlayContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 2% 0
`;

const VideoTitle = styled.div`
    width: 100%;
    height: 10vh;
    font-size: 2.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: center;
`;

const VideoDetail = styled.div`
    width: 100%;
    height: 50%;
    padding: 2% 0;
    display: flex;
    justify-content: start;
    align-content: center;
`;

const VideoOwnerAvatar = styled.div`
    width: 50px;
    height: 100%;
`;

const playerConfig = {
    width: '100%',
    height: '66vh',
    controls: false,
    onReady: true,
};

const playerInlineConfig = {
    minWidth: '640px',
    minHeight: '360px'
};

const videoListItemConfig = {
    width: '100%',
    height: '90px',
    marginBottom: '2%',
    imgWidth: 120
};

const videoItemData = {
    id: '123',
    title: 'test',
    imgURL: 'https://i.ytimg.com/vi/zymgtV99Rko/default.jpg',
    description: 'testtesttesttesttest'
};

class Play extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getPlayData: false,
            playData: {}
        };
    }

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case PlayRedux.PlayActions.getPlaySuccess:
                return {getPlayData: true, playData: nextProps.action.payload};

            default:
                break;
        }

        return null;
    }

    render() {
        return (
            <div>
                <Header/>
                <PlayView>
                    <PlayInfo>
                        <VideoPlayer
                            playerData={this.state.playData}
                            playerConfig={playerConfig}
                            playerInlineConfig={playerInlineConfig}
                        />
                        <PlayContent>
                            <VideoTitle>{this.state.playData.title}</VideoTitle>
                            <VideoDetail>
                                <VideoOwnerAvatar>
                                    <UserAvatar avatarData={
                                        {
                                            imgURL: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                                            imgSize: 50
                                        }
                                    }/>
                                </VideoOwnerAvatar>
                                <VideoDescription
                                    descriptionData={
                                        {
                                            title: 'Name',
                                            release: '2020-05-26',
                                            contentInfo: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                                        }
                                    }
                                />
                            </VideoDetail>
                        </PlayContent>
                    </PlayInfo>
                    <RelatedVideo>
                        <VideoListItem
                            key={videoItemData.id}
                            videoItemData={videoItemData}
                            videoListItemConfig={videoListItemConfig}
                        />
                    </RelatedVideo>
                </PlayView>
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