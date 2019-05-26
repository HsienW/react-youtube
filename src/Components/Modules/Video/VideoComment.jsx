import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Comment, Tooltip, List} from 'antd';

const data = [
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
];

export default class VideoComment extends Component {

    render() {
        // const {commentData} = {...this.props};
        return (
            <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
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

VideoComment.propTypes = {
    commentData: PropTypes.object.isRequired,
};
