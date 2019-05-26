import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

const {Meta} = Card;

const videoItemStyle = {
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

export default class VideoListItem extends Component {
    render() {
        const {videoListItemConfig, videoItemData} = {...this.props};
        return (
            <div style={videoListItemConfig}>
                <Card
                    hoverable
                    style={videoItemStyle}
                    bodyStyle={{
                        width: `calc(100% - ${videoListItemConfig.imgWidth}px)`
                    }}
                    cover={<img alt={videoItemData.title} src={videoItemData.imgURL}/>}
                >
                    <Meta
                        style={DescriptionStyle}
                        title={videoItemData.title}
                        description={
                            <div style={textOverStyle}>
                                {videoItemData.description}
                            </div>
                        }
                    />
                </Card>
            </div>
        );
    }
}

VideoListItem.propTypes = {
    videoListItemConfig: PropTypes.object.isRequired,
    videoItemData: PropTypes.object.isRequired
};