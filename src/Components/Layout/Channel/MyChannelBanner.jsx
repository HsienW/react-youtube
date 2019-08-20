import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {UserAvatar} from '../../Modules';

const MyChannelBannerView = styled.div`
    min-height: 200px;
    width: 100%;
    height: 12vh;
    padding: 2rem 0;
`;

const UserProfileImg = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 0 1rem 0;
`;

const UserName = styled.div`
    width: 100%;
    font-size: 2rem;
    text-align: center;
`;

export default class MyChannelBanner extends Component {
    
    render() {
        const {myChannelBannerData, myChannelBannerConfig} = {...this.props};
        return (
            <MyChannelBannerView>
                <UserProfileImg>
                    <UserAvatar avatarData={
                        {
                            imgURL: myChannelBannerData[0].snippet.thumbnails.default.url,
                            imgSize: myChannelBannerConfig.avatarSize
                        }
                    }/>
                </UserProfileImg>
                <UserName>123</UserName>
            </MyChannelBannerView>
        );
    }
}

MyChannelBanner.propTypes = {
    myChannelBannerData: PropTypes.object.isRequired,
    myChannelBannerConfig: PropTypes.object.isRequired
};
