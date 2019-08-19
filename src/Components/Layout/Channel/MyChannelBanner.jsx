import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {UserAvatar} from '../../Modules';

const MyChannelBannerView = styled.div`
    min-height: 100px;
    width: 100%;
    height: 140px;
    padding: 2rem 0;
`;

export default class MyChannelBanner extends Component {
    
    render() {
        const {myChannelBannerData, myChannelBannerConfig} = {...this.props};
        return (
            <MyChannelBannerView>
                <UserAvatar avatarData={
                    {
                        imgURL: myChannelBannerData[0].snippet.thumbnails.default.url,
                        imgSize: myChannelBannerConfig.avatarSize
                    }
                }/>
            </MyChannelBannerView>
        );
    }
}

MyChannelBanner.propTypes = {
    myChannelBannerData: PropTypes.object.isRequired,
    myChannelBannerConfig: PropTypes.object.isRequired
};
