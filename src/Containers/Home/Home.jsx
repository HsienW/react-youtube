import React, {Component} from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, HomeRedux, PlayRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {PageHeader, VideoItem} from '../../Components/Modules/index';
import {Header} from '../../Components/Layout/index';
import {formatData, formatCurry} from '../../Common/BasicService';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import {homeApi} from '../../ApiCenter/Api/Api';

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

@CheckAuthHOC
@LoadingDataHOC
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            getHomeStatus: false,
            homeData: []
        };
    }
    
    componentDidMount() {
        this.getHomeAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case HomeRedux.HomeActions.getHomeSuccess:
                return {getHomeStatus: true, homeData: nextProps.action.payload.items};
            
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
    
    videoItemClick = (videoItemInfo) => {
        WebStorage.setSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO, formatCurry.objToStringify(videoItemInfo));
        this.props.PortalActionsCreator.changeToPage('play');
    };
    
    render() {
        return (
            <div>
                <Header/>
                <HomeView>
                    <PageHeader/>
                    <ContentArea>
                        {
                            this.state.homeData.length !== 0
                                ? formatData.videoItemRespond(this.state.homeData).map((item) => {
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
                </HomeView>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
    HomeActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    PlayActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func
};

export default connect(
    (state) => {
        return {action: state.HomeReducer.action};
    },
    (dispatch) => {
        return {
            HomeActionsCreator: bindActionCreators(HomeRedux.HomeActionsCreator, dispatch),
            PlayActionsCreator: bindActionCreators(PlayRedux.PlayActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch)
        };
    }
)(Home);