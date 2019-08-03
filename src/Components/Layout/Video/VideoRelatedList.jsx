import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VideoListItem} from '../../../Components/Modules';
import {formatData} from '../../../Common/BasicService';
import styled from 'styled-components';

const VideoRelatedListView = styled.div`
    width: 30%;
    padding: 0 1%;
    min-width: 360px;
    min-height: 600px;
    max-height: 100%;
    overflow: auto;
`;

export default class VideoRelatedList extends Component {
    
    render() {
        const {videoRelatedData, videoListItemConfig} = {...this.props};
        return (
            <VideoRelatedListView>
                {
                    formatData.videoListItemRespond(videoRelatedData.items).map((item) => {
                        return (
                            <VideoListItem
                                key={item.id.videoId}
                                videoListItemData={item}
                                videoListItemConfig={videoListItemConfig}
                            />
                        );
                    })
                }
            </VideoRelatedListView>
        );
    }
}

VideoRelatedList.propTypes = {
    videoRelatedData: PropTypes.object.isRequired,
    videoListItemConfig: PropTypes.object.isRequired
};
