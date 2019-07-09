import React from 'react';
import {Waypoint} from 'react-waypoint';
import './InfiniteScroll.scss';

export default function InfiniteScroll(props) {
    return (
        <React.Fragment>
            {props.children}
            <Waypoint onEnter={props.bottomReached}>
            </Waypoint>
        </React.Fragment>
    );
}