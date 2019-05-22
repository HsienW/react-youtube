import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import {VideoPlayerConfig} from '../../../Common/ComponentConfig';
import {Button, Slider} from 'antd';
import styled from 'styled-components';
// import * as Style from '../../../Common/Style';

const ControlArea = styled.div`
    height: 10%;
    width: 100%;
    padding: 1% 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ControlBtn = styled.div`
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const videoSliderStyle = {
    width: '80%',
    maxWidth: '80%',
    minWidth: '300px',
    padding: '0 1%'
};

const volumeSliderStyle = {
    width: '12px',
    height: '60px',
    position: 'absolute',
    bottom: '150px',
    left: '160px'
};

export default class VideoPlayer extends Component {

    state = {
        playing: true,
        videoVolume: 0.5,
        videoProgress: 0
    };

    playClick = () => {
        this.setState({
            playing: !this.state.playing
        });
        // this.props.itemClickAction(this.props.videoItemData);
    };

    render() {
        const {configData, playerData, playerInlineStyle} = {...this.props};
        console.log('8888888888888888888888888888');
        console.log(configData);
        return (
            <div>
                <ReactPlayer
                    url={VideoPlayerConfig.basicURL + playerData.id}
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
                    <ControlBtn>
                        <Button
                            icon={this.state.playing ? 'pause' : 'caret-right'}
                            onClick={this.playClick}
                        />
                        <Button icon="sound"/>
                        <Slider
                            style={volumeSliderStyle}
                            defaultValue={50}
                            tooltipVisible={false}
                            vertical={true}
                            value={this.state.videoVolume}
                        />
                    </ControlBtn>
                    <Slider
                        style={videoSliderStyle}
                        defaultValue={0}
                        tooltipVisible={false}
                        value={this.state.videoProgress}
                    />
                    <ControlBtn>
                        <Button icon="fullscreen"/>
                    </ControlBtn>
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
