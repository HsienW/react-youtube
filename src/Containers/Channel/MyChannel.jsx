import React, {Component} from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MyChannelRedux, PortalRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {MyChannelBanner, ActionAlert} from '../../Components/Layout';
import {PageDivider, VideoItem, UserActionResult} from '../../Components/Modules';
import {channelApi, videoApi} from '../../ApiCenter/Api/Api';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {formatCurry, formatData} from '../../Common/BasicService';

const MyChannelView = styled.div`
    padding: 7vh 8vw 0 8vw;
    height: 100vh;
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    min-height: 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const myChannelBannerConfig = {
    avatarSize: 88,
};

const uploadVideoDividerData = {
    title: 'Upload Videos'
};

const likeVideoDividerData = {
    title: 'Like Videos'
};

const userActionResultData = {
    title: 'Loading...'
};

const errorAlertConfigData = {
    type: 'error'
};

@CheckAuthHOC
@LoadingDataHOC
class MyChannel extends Component {
    
    constructor() {
        super();
        this.state = {
            getMyChannelStatus: false,
            getMyUploadListStatus: false,
            getMyLikeListStatus: false,
            myChannelData: [],
            myUploadVideoListData: [],
            myLikeVideoListData: [],
        };
    }
    
    componentDidMount() {
        this.getMyChannelAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case MyChannelRedux.MyChannelActions.getMyChannelSuccess:
                return {getMyChannelStatus: true, myChannelData: nextProps.action.payload.data.items};
            
            case MyChannelRedux.MyUploadListActions.getMyUploadListSuccess:
                return {getMyUploadListStatus: true, myUploadVideoListData: nextProps.action.payload.data.items};
            
            case MyChannelRedux.MyLikeListActions.getMyLikeListSuccess:
                return {getMyLikeListStatus: true, myLikeVideoListData: nextProps.action.payload.data.items};
    
            default:
                break;
        }
        
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (is.all.truthy(prevState)) {
            this.props.toggleShowLoading(false);
        }
    }
    
    getMyChannelAllData = () => {
        const userToken = WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN);
        const userUploadId = 'LL5jvFNi4xoq4ri9fb8xF8Tw';
        // const userUploadId = WebStorage.getSessionStorage(WebStorageKeys.USER_PROFILE_UPLOAD_LIST_ID);
        const myChannelRequest = channelApi.createMyChannelRequest(
            'snippet,contentDetails,statistics',
            true,
            userToken,
            20,
        );
        const myUploadVideoListRequest = channelApi.createMyUploadListRequest(
            'snippet,contentDetails,status',
            userUploadId,
            userToken,
            6,
        );
        const myLikeVideoListRequest = videoApi.createMyLikeVideoListRequest(
            'snippet,contentDetails,statistics',
            'like',
            userToken,
            6,
        );
        this.props.MyChannelActionsCreator.getMyChannelData(myChannelRequest);
        this.props.MyChannelActionsCreator.getMyUploadVideoListData(myUploadVideoListRequest);
        this.props.MyChannelActionsCreator.getMyLikeVideoListData(myLikeVideoListRequest);
    };
    
    videoItemClick = (videoItemInfo) => {
        WebStorage.setSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO, formatCurry.objToStringify(videoItemInfo));
        this.props.PortalActionsCreator.changeToPage('play');
    };
    
    render() {
        return (
            <div>
                {
                    this.state.getMyChannelStatus
                    && this.state.getMyUploadListStatus
                    && this.state.getMyLikeListStatus
                        ? <MyChannelView>
                            <MyChannelBanner
                                myChannelBannerData={this.state.myChannelData}
                                myChannelBannerConfig={myChannelBannerConfig}
                            />
                            <PageDivider dividerData={uploadVideoDividerData}/>
                            <ContentArea>
                                {
                                    this.state.myUploadVideoListData.length !== 0
                                        ? formatData.videoItemRespond(this.state.myUploadVideoListData).map((item) => {
                                            return (
                                                <VideoItem
                                                    key={item.id}
                                                    videoItemData={item}
                                                    itemClickAction={this.videoItemClick}
                                                />
                                            );
                                        })
                                        : <div>No-Data</div>
                                }
                            </ContentArea>
                            <PageDivider dividerData={likeVideoDividerData}/>
                            <ContentArea>
                                {
                                    this.state.myLikeVideoListData.length !== 0
                                        ? formatData.videoItemRespond(this.state.myLikeVideoListData).map((item) => {
                                            return (
                                                <VideoItem
                                                    key={item.id}
                                                    videoItemData={item}
                                                    itemClickAction={this.videoItemClick}
                                                />
                                            );
                                        })
                                        : <div>No-Data</div>
                                }
                            </ContentArea>
                        </MyChannelView>
                        : <MyChannelView>
                            <UserActionResult userActionResultData={userActionResultData}/>
                        </MyChannelView>
                }
                <ActionAlert configData={errorAlertConfigData}/>
            </div>
        );
    }
}

MyChannel.propTypes = {
    MyChannelActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func
};

export default connect(
    (state) => {
        return {action: state.MyChannelReducer.action};
    },
    (dispatch) => {
        return {
            MyChannelActionsCreator: bindActionCreators(MyChannelRedux.MyChannelActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch)
        };
    }
)(MyChannel);
