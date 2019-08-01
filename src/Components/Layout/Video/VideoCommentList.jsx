import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VideoComment} from '../../../Components/Modules';
// import {formatData} from '../../../Common/BasicService';
import styled from 'styled-components';

const VideoCommentView = styled.div`
`;

export default class VideoCommentList extends Component {
    
    render() {
        const {commentListData} = {...this.props};
        return (
            <VideoCommentView>
                {
                    commentListData.items.map((item) => {
                        return (
                            <VideoComment
                                key={item.id}
                                commentItemData={item}
                            />
                        );
                    })
                }
            </VideoCommentView>
        );
    }
}

VideoCommentList.propTypes = {
    commentListData: PropTypes.object.isRequired,
};
