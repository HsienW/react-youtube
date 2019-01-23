import React, {Component} from 'react';
import {Card} from 'antd';
import * as Style from '../../../Common/Style';
import styled from 'styled-components';

const {Meta} = Card;

const VideoItem = styled.div`
    width: 180px;
    height: 220px;
    color: ${Style.FontMinorColor}
    border: ${Style.FontMinorColor} 1px solid;
`;

export default class Video extends Component {
    render() {
        return (
            <VideoItem>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
                >
                    <Meta
                        title='Europe Street beat'
                        description='www.instagram.com'
                    />
                </Card>
            </VideoItem>
        );
    }
}
