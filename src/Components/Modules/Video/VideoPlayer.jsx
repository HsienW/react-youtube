import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import {VideoPlayerConfig} from '../../../Common/ComponentConfig';
import {Button, Slider} from 'antd';
import {formatData} from '../../../Common/BasicService';
import styled from 'styled-components';

const PlayerControl = styled.div`
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

const PlayerTime = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const videoSliderStyle = {
    width: '72%',
    maxWidth: '72%',
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
        playing: false,
        playSeek: false,
        showVolumeSlider: false,
        videoVolume: 0.5,
        videoProgress: 0,
        videoNewProgress: 0
    };

    playClick = () => {
        this.setState({
            playing: !this.state.playing
        });
    };

    fullScreenClick = () => {
        const video = document.querySelector('#' + this.player.props.id);
        video.requestFullscreen();
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

    getVideoProgress = (onProgress) => {
        this.setState({
            videoProgress: onProgress.playedSeconds
        });
    };

    changeVideoProgress = (newProgress) => {
        this.setState({
            playSeek: true,
            videoNewProgress: parseInt(newProgress)
        }, () => {
            this.player.seekTo(parseInt(newProgress));
        });
    };

    getVideoPlayEnded = () => {
        this.setState({
            playing: false
        });
    };

    getVideoDefaultPlay = () => {
        if (this.props.playerConfig.defaultPlay) {
            this.setState({
                playing: true
            });
        }
    };

    refPlayer = (player) => {
        this.player = player;
    };

    render() {
        const {playerConfig, playerData, playerInlineStyle} = {...this.props};
        return (
            <div>
                <ReactPlayer
                    id={playerData.id}
                    ref={this.refPlayer}
                    url={VideoPlayerConfig.basicURL + playerData.id}
                    width={playerConfig.width}
                    height={playerConfig.height}
                    muted={playerConfig.mute}
                    style={playerInlineStyle}
                    controls={playerConfig.defaultControls}
                    playing={this.state.playing}
                    volume={this.state.videoVolume}
                    progressInterval={this.state.videoProgress}
                    onReady={this.getVideoDefaultPlay}
                    onProgress={this.getVideoProgress}
                    onEnded={this.getVideoPlayEnded}
                />
                {
                    playerConfig.showControl
                        ? <PlayerControl>
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
                                min={0}
                                max={playerData.totalTime}
                                value={this.state.videoProgress}
                                tooltipVisible={false}
                                onChange={this.changeVideoProgress}
                            />
                            <PlayerTime>
                                {formatData.videoPlayerTime(parseInt(this.state.videoProgress))}
                                /{formatData.videoPlayerTime(playerData.totalTime)}
                            </PlayerTime>
                            <ControlBtn>
                                <Button icon="fullscreen" onClick={this.fullScreenClick}/>
                            </ControlBtn>
                        </PlayerControl>
                        : null
                }
            </div>
        );
    }
}

VideoPlayer.propTypes = {
    playerData: PropTypes.object.isRequired,
    playerConfig: PropTypes.object.isRequired,
    playerInlineConfig: PropTypes.object.isRequired
};
