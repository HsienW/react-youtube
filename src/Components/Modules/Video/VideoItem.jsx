import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import styled from 'styled-components';
// import 'antd/es/Card/style/css';

const {Meta} = Card;

const ItemView = styled.div`
    width: 340px;
    height: 340px;
    padding: 10px;
`;

const ItemStyle = {
    width: '320px',
    height: '180px',
};

const textOverStyle = {
    display: '-webkit-box',
    maxHeight: '6rem',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    WebkitLineClamp: 4,
    fontSize: '14px',
    lineHeight: '1.5rem',
};

export default class VideoItem extends Component {

    itemClick = () => {
        this.props.itemClickAction(this.props.videoItemData);
    };

    render() {
        const {videoItemData} = {...this.props};
        return (
            <ItemView>
                <Card
                    hoverable
                    style={ItemStyle}
                    cover={<img alt={videoItemData.title} src={videoItemData.imgURL}/>}
                    onClick={this.itemClick}
                >
                    <Meta
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

VideoItem.propTypes = {
    // videoItemConfig: PropTypes.object.isRequired,
    videoItemData: PropTypes.object.isRequired,
    itemClickAction: PropTypes.func.isRequired
};
