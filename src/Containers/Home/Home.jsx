import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, HomeRedux, PlayRedux, ProfileRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators';
import {PageDivider, VideoItem, UserActionResult} from '../../Components/Modules';
import {formatData, formatCurry} from '../../Common/BasicService';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {channelApi, homeApi} from '../../ApiCenter/Api/Api';

const HomeView = styled.div`
    padding: 7vh 8vw 0 8vw;
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

@CheckAuthHOC
@LoadingDataHOC
class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            getHomeRecommendStatus: false,
            getProfileChannelStatus: false,
            homeRecommendData: [],
            profileChannelData: [],
        };
    }
    
    componentDidMount() {
        // if (this.state.getHomeRecommendStatus && this.state.getProfileChannelStatus) {
        //     this.props.toggleShowLoading(false);
        //     return;
        // }
        // this.props.toggleShowLoading(true);
        this.getHomeAllData();
        this.getProfileAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case HomeRedux.HomeRecommendActions.getHomeRecommendSuccess:
                return {getHomeRecommendStatus: true, homeRecommendData: nextProps.action.payload.items};
            
            case ProfileRedux.ProfileChannelActions.getProfileChannelDataSuccess:
                return {getProfileChannelStatus: true, profileChannelData: nextProps.action.payload.data.items};
            
            default:
                break;
        }
        
        return null;
    }
    
    // componentDidUpdate(prevProps, prevState) {
    //     if (is.all.truthy(prevState)) {
    //         this.props.toggleShowLoading(false);
    //     }
    // }
    //
    getHomeAllData = () => {
        const homeRecommendRequest = homeApi.createRecommendRequest(
            'snippet, contentDetails',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            20,
            'mostPopular',
        );
        // this.props.HomeActionsCreator.getHomeRecommendData(homeRecommendRequest);
        this.props.HomeActionsCreator.simulationGetHomeRecommendData(homeRecommendRequest);
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
                <HomeView>
                    <PageDivider dividerData={recommendDividerData}/>
                    <ContentArea>
                        {
                            this.state.getHomeRecommendStatus && this.state.getProfileChannelStatus
                                ? formatData.videoItemRespond(this.state.homeRecommendData).map((item) => {
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
            </div>
        );
    }
}

Home.propTypes = {
    HomeActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    PlayActionsCreator: PropTypes.object.isRequired,
    ProfileActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func,
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
            ProfileActionsCreator: bindActionCreators(ProfileRedux.ProfileActionsCreator, dispatch)
        };
    }
)(Home);
