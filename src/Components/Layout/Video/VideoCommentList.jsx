import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {formatData} from '../../../Common/BasicService'
import {Comment, List, Tooltip} from 'antd';
import moment from 'moment';
// import styled from 'styled-components';

// const VideoCommentView = styled.div`
// `;

export default class VideoCommentList extends Component {
    
    createCommentData = (commentData) => {
        const newCommentData = [];
    
        commentData.forEach((item) => {
            console.log('eeeeeeeee');
            console.log(item);
            newCommentData.push(
                {
                    key: '123',
                    actions: <span>Reply to</span>,
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: (
                        <p>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully and
                            efficiently.
                        </p>
                    ),
                    datetime: (
                        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().subtract(1, 'days').fromNow()}</span>
                        </Tooltip>
                    ),
                }
            );
        });
        
        return newCommentData;
    };
    
    render() {
        const {commentListData} = {...this.props};
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
        console.log(commentListData);
        return (
            <List
                className="comment-list"
                header={'5 replies'}
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
