import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import styled from 'styled-components';

const {Meta} = Card;

const ItemView = styled.div`
    width: 100%;
    height: 200px;
    padding: 0 10px 20px;
`;

const videoItemStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    border: 0
};

const ContentStyle = {
    width: 'calc(100% - 320px)',
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
        const {videoItemData} = {...this.props};
        return (
            <ItemView>
                <Card
                    hoverable
                    style={videoItemStyle}
                    bodyStyle={ContentStyle}
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
            </ItemView>
        );
    }
}

VideoListItem.propTypes = {
    videoItemData: PropTypes.object.isRequired,
};