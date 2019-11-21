import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Comment, List, Tooltip} from 'antd';
import moment from 'moment/min/moment.min';

export default class VideoCommentList extends Component {
    
    createCommentData = (commentData) => {
        const newCommentData = [];
    
        commentData.forEach((item) => {
            newCommentData.push(
                {
                    key: item.id,
                    actions: <span>Reply to</span>,
                    author: item.snippet.topLevelComment.snippet.authorDisplayName,
                    avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
                    content: (<p>{item.snippet.topLevelComment.snippet.textDisplay}</p>),
                    datetime: (
                        <Tooltip title={moment(item.snippet.topLevelComment.snippet.publishedAt).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                        </Tooltip>
                    ),
                }
            );
        });
        
        return newCommentData;
    };
    
    render() {
        const {commentListData} = {...this.props};
        return (
            <List
                className="comment-list"
                header={'20 replies'}
                itemLayout="horizontal"
                dataSource={this.createCommentData(commentListData.items)}
                renderItem={item => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        );
    }
}

VideoCommentList.propTypes = {
    commentListData: PropTypes.object.isRequired,
};
