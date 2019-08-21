import React, {Component} from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MyChannelRedux, PortalRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {Header, MyChannelBanner} from '../../Components/Layout';
import {PageDivider, VideoItem} from '../../Components/Modules/index';
import {channelApi, videoApi} from '../../ApiCenter/Api/Api';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {formatCurry, formatData} from '../../Common/BasicService';

const MyChannelView = styled.div`
    padding: 0 8%;
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
    avatarSize: 80,
};

const uploadVideoDividerData = {
    title: 'My Upload Video'
};

const likeVideoDividerData = {
    title: 'My Like Video'
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
            myUploadListData: [],
            myLikeListData: []
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
                return {getMyUploadListStatus: true, myUploadListData: nextProps.action.payload.data.items};
    
            case MyChannelRedux.MyLikeListActions.getMyLikeListSuccess:
                return {getMyLikeListStatus: true, myLikeListData: nextProps.action.payload.data.items};
            
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
        const myChannelRequest = channelApi.createMyChannelRequest(
            'snippet,contentDetails,statistics',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            20,
        );
        const myUploadListRequest = channelApi.createMyUploadListRequest(
            'snippet,contentDetails',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            20,
        );
        const myLikeListRequest = videoApi.createMyLikeVideoListRequest(
            'snippet,contentDetails,statistics',
            'like',
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            6,
        );
        this.props.MyChannelActionsCreator.getMyChannelData(myChannelRequest);
        this.props.MyChannelActionsCreator.getMyUploadListData(myUploadListRequest);
        this.props.MyChannelActionsCreator.getMyLikeListData(myLikeListRequest);
    };
    
    videoItemClick = (videoItemInfo) => {
        WebStorage.setSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO, formatCurry.objToStringify(videoItemInfo));
        this.props.PortalActionsCreator.changeToPage('play');
    };
    
    render() {
        return (
            <div>
                <Header/>
                {
                    this.state.getMyChannelStatus
                        ? <MyChannelView>
                            <MyChannelBanner
                                myChannelBannerData={this.state.myChannelData}
                                myChannelBannerConfig={myChannelBannerConfig}
                            />
                            <PageDivider dividerData={uploadVideoDividerData}/>
                            <ContentArea>
                                {
                                    this.state.myUploadListData.length !== 0
                                        ? formatData.videoItemRespond(this.state.myUploadListData).map((item) => {
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
                                    this.state.myLikeListData.length !== 0
                                        ? formatData.videoItemRespond(this.state.myLikeListData).map((item) => {
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
                        : <div>No-Data</div>
                }
            </div>
        );
    }
}

MyChannel.propTypes = {
    history: PropTypes.object.isRequired,
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
