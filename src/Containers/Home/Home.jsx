import React, {Component} from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, HomeRedux, PlayRedux, ProfileRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators';
import {PageDivider, VideoItem, UserActionResult} from '../../Components/Modules';
import {Header, ActionAlert} from '../../Components/Layout';
import {formatData, formatCurry} from '../../Common/BasicService';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {homeApi, channelApi} from '../../ApiCenter/Api/Api';

const HomeView = styled.div`
    padding: 0 8%;
    height: 100vh;
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const recommendDividerData = {
    title: 'Recommend'
};

const userActionResultData = {
    title: 'Loading...'
};

const errorAlertConfigData = {
    type: 'error'
};

@CheckAuthHOC
@LoadingDataHOC
class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            getHomeStatus: false,
            getProfileChannelStatus: false,
            homeData: [],
            profileChannelData: [],
        };
    }
    
    componentDidMount() {
        this.getHomeAllData();
        this.getProfileAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case HomeRedux.HomeActions.getHomeSuccess:
                return {getHomeStatus: true, homeData: nextProps.action.payload.items};
    
            case ProfileRedux.ProfileChannelActions.getProfileChannelDataSuccess:
                return {getProfileChannelStatus: true, profileChannelData: nextProps.action.payload.items};
            
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
    
    getHomeAllData = () => {
        const homeRecommendRequest = homeApi.createRecommendRequest(
            'snippet, contentDetails',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            20,
            'mostPopular',
        );
        this.props.HomeActionsCreator.testGetHomeData(homeRecommendRequest);
        // this.props.HomeActionsCreator.getHomeData(homeRecommendRequest);
    };
    
    getProfileAllData = () => {
        const profileChannelRequest = channelApi.createProfileChannelRequest(
            'contentDetails',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
        );
        this.props.ProfileActionsCreator.getProfileChannelData(profileChannelRequest);
    };
    
    videoItemClick = (videoItemInfo) => {
        WebStorage.setSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO, formatCurry.objToStringify(videoItemInfo));
        this.props.PortalActionsCreator.changeToPage('play');
    };
    
    render() {
        return (
            <div>
                <Header/>
                <HomeView>
                    <PageDivider dividerData={recommendDividerData}/>
                    <ContentArea>
                        {
                            this.state.getHomeStatus
                                ? formatData.videoItemRespond(this.state.homeData).map((item) => {
                                    return (
                                        <VideoItem
                                            key={item.id}
                                            videoItemData={item}
                                            itemClickAction={this.videoItemClick}
                                        />
                                    );
                                })
                                : <UserActionResult userActionResultData={userActionResultData}/>
                        }
                    </ContentArea>
                </HomeView>
                <ActionAlert configData={errorAlertConfigData}/>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
    HomeActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    ProfileActionsCreator: PropTypes.object.isRequired,
    PlayActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func,
    toggleShowAlert: PropTypes.func
};

export default connect(
    (state) => {
        return {action: state.HomeReducer.action};
    },
    (dispatch) => {
        return {
            HomeActionsCreator: bindActionCreators(HomeRedux.HomeActionsCreator, dispatch),
            PlayActionsCreator: bindActionCreators(PlayRedux.PlayActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            ProfileActionsCreator: bindActionCreators(ProfileRedux.ProfileActionsCreator, dispatch),
        };
    }
)(Home);