import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    fontSize: '12px',
    lineHeight: '1.5rem',
};

export default class VideoListItem extends Component {
    
    videoListItemClick = () => {
        this.props.itemClickAction(this.props.videoListItemData);
    };
    
    render() {
        const {videoListItemConfig, videoListItemData} = {...this.props};
        return (
            <div
                style={videoListItemConfig}
                onClick={this.videoListItemClick}
            >
                <Card
                    hoverable
                    style={ItemStyle}
                    bodyStyle={{
                        width: `calc(100% - ${videoListItemConfig.imgWidth}px)`,
                        padding: '10px',
                    }}
                    cover={
                        <img
                            alt={videoListItemData.title}
                            src={videoListItemData.imgURL}
                            style={{width: videoListItemConfig.imgWidth}}
                        />
                    }
                >
                    <Meta
                        className={videoListItemConfig.assignedListItem}
                        style={DescriptionStyle}
                        title={videoListItemData.title}
                        description={
                            <div style={textOverStyle}>
                                {videoListItemData.description}
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
    videoListItemData: PropTypes.object.isRequired,
    itemClickAction: PropTypes.func.isRequired
};