import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PlayActionsCreator} from '../../Redux/Modules/Play/PlayRedux';
import {PlayRedux} from '../../Redux/Modules';
import {Header} from '../../Components/Layout/index';
import {VideoPlayer, UserAvatar} from '../../Components/Modules';
import * as Style from '../../Common/Style';

const PlayView = styled.div`
    width: 100%;
    height: 90vh;
    padding: 2% 8% 0 8%;
`;

const PlayInfoArea = styled.div`
    width: 54vw;
    height: 100%;
    min-width: 640px;
    min-height: 60px;
`;

const TitleArea = styled.div`
    width: 100%;
    height: 10vh;
    font-size: 26px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: center;
    border-bottom: ${Style.FontMinorColor} 1.5px solid;
`;

const DetailArea = styled.div`
    width: 100%;
    height: 100%;
    padding: 2% 0
`;

const playerConfig = {
    width: '54vw',
    height: '66vh',
    controls: false,
    onReady: true,
};

const playerInlineStyle = {
    minWidth: '640px',
    minHeight: '360px'
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
        console.log('mmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(nextProps.action);
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
                    <PlayInfoArea>
                        <VideoPlayer
                            playerData={this.state.playData}
                            configData={playerConfig}
                            playerInlineStyle={playerInlineStyle}
                        />
                        <TitleArea>{this.state.playData.title}</TitleArea>
                        <DetailArea>
                            <UserAvatar configData={{imgURL: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}}/>
                        </DetailArea>
                    </PlayInfoArea>
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