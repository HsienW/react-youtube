import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'antd';
import {ContentDropdown} from '../../Modules';

const contentBodyStyle = {
    padding: '20px',
    maxWidth: '30vw',
    maxHeight: '50vh',
    overflow: 'auto'
};

export default class SubscribeNotice extends Component {
    render() {
        const {subscribeNoticeData, configData, btnConfig} = {...this.props};
        return (
            <Badge count={subscribeNoticeData.length}>
                <ContentDropdown
                    configData={configData}
                    btnConfig={btnConfig}
                    contentBodyStyle={contentBodyStyle}
                    contentData={subscribeNoticeData}
                />
            </Badge>
        );
    }
}

SubscribeNotice.propTypes = {
    subscribeNoticeData: PropTypes.object.isRequired,
    configData: PropTypes.object.isRequired,
    btnConfig: PropTypes.object.isRequired,
    // itemClickAction: PropTypes.func.isRequired
};