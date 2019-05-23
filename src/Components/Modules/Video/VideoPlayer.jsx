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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const videoSliderStyle = {
    width: '80%',
    maxWidth: '80%',
    minWidth: '300px',
    margin: '0 2%'
};

const volumeSliderStyle = {
    width: '12px',
    height: '70px',
    position: 'absolute',
    bottom: '30px',
    left: '36px'
};

export default class VideoPlayer extends Component {

    state = {
        playing: true,
        showVolumeSlider: false,
        videoVolume: 0.5,
        videoProgress: 0
    };

    playClick = () => {
        this.setState({
            playing: !this.state.playing
        });
        // this.props.itemClickAction(this.props.videoItemData);
    };

    volumeClick = () => {
        this.setState({
            showVolumeSlider: !this.state.showVolumeSlider
        });
    };

    changeVolume = (volume) => {
        this.setState({
            videoVolume: volume / 100
        });
    };

    changeVideoProgress = (v) => {
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(v);
    };

    test = (onProgress) => {
        this.setState({
            videoProgress: onProgress.playedSeconds
        });
    };

    render() {
        const {configData, playerData, playerInlineStyle} = {...this.props};
        return (
            <div>
                <ReactPlayer
                    url={VideoPlayerConfig.basicURL + playerData.id}
                    width={configData.width}
                    height={configData.height}
                    style={playerInlineStyle}
                    controls={configData.controls}
                    playing={this.state.playing}
                    volume={this.state.videoVolume}
                    progressInterval={this.state.videoProgress}
                    onProgress={this.test}
                />
                <ControlArea>
                    <ControlBtn>
                        <Button
                            icon={this.state.playing ? 'pause' : 'caret-right'}
                            onClick={this.playClick}
                        />
                        <Button icon="sound" onClick={this.volumeClick}/>
                        {
                            this.state.showVolumeSlider
                                ? <Slider
                                    style={volumeSliderStyle}
                                    defaultValue={50}
                                    tooltipVisible={false}
                                    vertical={true}
                                    onAfterChange={this.changeVolume}
                                /> : null
                        }
                    </ControlBtn>
                    <Slider
                        style={videoSliderStyle}
                        defaultValue={0}
                        min={0}
                        max={playerData.totalTime}
                        value={this.state.videoProgress}
                        tooltipVisible={false}
                        onAfterChange={this.changeVideoProgress}
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
