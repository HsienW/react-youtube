import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VideoPlayer} from '../index';
import {Card} from 'antd';

const {Meta} = Card;

const ItemStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    border: 0
};

const DescriptionStyle = {
    width: '100%',
    height: '100%',
};

const textOverStyle = {
    display: '-webkit-box',
    maxHeight: '7.5rem',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    WebkitLineClamp: 5,
    fontSize: '14px',
    lineHeight: '1.5rem',
};

export default class VideoListPlayItem extends Component {
    render() {
        const {VideoListPlayItemConfig, VideoListPlayItemData} = {...this.props};
        return (
            <div style={VideoListPlayItemConfig}>
                <Card
                    hoverable
                    style={ItemStyle}
                    bodyStyle={{
                        width: `calc(100% - ${VideoListPlayItemConfig.videoWidth}px)`
                    }}
                    cover={
                        <VideoPlayer
                            playerData={VideoListPlayItemData.playData}
                            playerConfig={VideoListPlayItemConfig.playerConfig}
                            playerInlineConfig={VideoListPlayItemConfig.playerInlineConfig}
                        />
                    }
                >
                    <Meta
                        style={DescriptionStyle}
                        title={VideoListPlayItemData.title}
                        description={
                            <div style={textOverStyle}>
                                {VideoListPlayItemData.description}
                            </div>
                        }
                    />
                </Card>
            </div>
        );
    }
}

VideoListPlayItem.propTypes = {
    VideoListPlayItemConfig: PropTypes.object.isRequired,
    VideoListPlayItemData: PropTypes.object.isRequired
};