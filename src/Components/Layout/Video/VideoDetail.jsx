import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserAvatar} from '../../../Components/Modules';
import {formatData} from '../../../Common/BasicService';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';

const VideoDetailView = styled.div`
    width: 100%;
    height: 100%;
    padding: 2% 0
`;

const VideoTitle = styled.div`
    width: 100%;
    height: 10vh;
    font-size: 2.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: center;
`;

const VideoCount = styled.div`
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: space-between;
    align-content: center;
`;

const AdvancedCount = styled.div`
    display: flex;
`;

const DisplayCount = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 8px;
`;

const VideoOwnerAvatar = styled.div`
    width: 50px;
    height: 100%;
`;

const VideoDescription = styled.div`
    display: flex;
`;

const VideoDesc = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 2%;
`;

const DescTitle = styled.div`
    font-size: 1.6rem;
`;

const DescRelease = styled.div`
    color: ${Style.FontStressColor}
`;

const DescInfo = styled.div`
    padding: 2% 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2.1rem;
`;

export default class VideoDetail extends Component {
    
    render() {
        const {videoDetailData} = {...this.props};
        return (
            <VideoDetailView>
                <VideoTitle>{videoDetailData.snippet.localized.title}</VideoTitle>
                <VideoCount>
                    <DisplayCount>ViewCount: {videoDetailData.statistics.viewCount}</DisplayCount>
                    <AdvancedCount>
                        <DisplayCount>Like: {videoDetailData.statistics.likeCount}</DisplayCount>
                        <DisplayCount>Dislike: {videoDetailData.statistics.dislikeCount}</DisplayCount>
                    </AdvancedCount>
                </VideoCount>
                <VideoDescription>
                    <VideoOwnerAvatar>
                        <UserAvatar avatarData={
                            {
                                imgURL: videoDetailData.snippet.thumbnails.default.url,
                                imgSize: 50
                            }
                        }/>
                    </VideoOwnerAvatar>
                    <VideoDesc>
                        <DescTitle>{videoDetailData.snippet.channelTitle}</DescTitle>
                        <DescRelease>
                            Release: {formatData.isoTimeToVideoDisplayData(videoDetailData.snippet.publishedAt)}
                        </DescRelease>
                        <DescInfo>
                            {videoDetailData.snippet.localized.description}
                        </DescInfo>
                    </VideoDesc>
                </VideoDescription>
            </VideoDetailView>
        );
    }
}

VideoDetail.propTypes = {
    videoDetailData: PropTypes.object.isRequired,
};
