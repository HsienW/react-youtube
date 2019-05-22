import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import {VideoPlayerItem} from '../../../Common/ComponentConfig';
import {Button, Progress} from 'antd';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';

const ControlArea = styled.div`
    height: 10%;
    width: 54vw;
`;

export default class VideoPlayer extends Component {

    state = {
        playing: true,
        volume: 0.5,
        progress: 0
    };

    // itemClick = () => {
    //     this.props.itemClickAction(this.props.videoItemData);
    // };

    render() {
        const {configData, playerData, playerInlineStyle} = {...this.props};
        console.log('8888888888888888888888888888');
        console.log(configData);
        return (
            <div>
                <ReactPlayer
                    url={VideoPlayerItem.basicURL + playerData.id}
                    width={configData.width}
                    height={configData.height}
                    style={playerInlineStyle}
                    controls={configData.controls}
                    onReady={configData.ready}
                    playing={this.state.playing}
                    volume={this.state.volume}
                    progressInterval={this.state.progress}
                />
                <ControlArea>
                    <Button icon="caret-right" onClick/>
                    <Button icon="sound"/>
                    <Progress
                        percent={50}
                        strokeWidth={2}
                        showInfo={false}
                        strokeColor={Style.FontStressColor}
                        style={{width: '50%'}}
                    />
                    <Button icon="fullscreen"/>

                </ControlArea>
            </div>
        );
    }
}

VideoPlayer.propTypes = {
    configData: PropTypes.object.isRequired,
    playerData: PropTypes.object.isRequired,
    playerInlineStyle: PropTypes.object.isRequired
};

// pause