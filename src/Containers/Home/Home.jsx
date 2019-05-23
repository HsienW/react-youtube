import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, HomeRedux, PlayRedux} from '../../Redux/Modules';
import {PageHeader, VideoItem} from '../../Components/Modules/index';
import {Header} from '../../Components/Layout/index';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {formatData} from '../../Common/BasicService';
import styled from 'styled-components';
// import * as apiData from '../../ApiCenter/Api/api';
// import * as dataCenter from '../../DataCenter';

const HomeView = styled.div`
    padding: 0 8%;
    height: 90vh;
    width: 100%;
`;

const ContentArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const request = {
    part: 'snippet, contentDetails',
    mine: true,
    access_token: sessionStorage.getItem('ACCESS_TOKEN'),
    maxResults: 12,
    chart: 'mostPopular'
};

@CheckAuthHOC
@LoadingDataHOC
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getHomeData: false,
            homeData: []
        };
    }

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case HomeRedux.HomeActions.getHomeSuccess:
                return {getHomeData: true, homeData: nextProps.action.payload.data};

            default:
                break;
        }

        return null;
    }

    componentDidUpdate() {
        if (!this.state.getHomeData) {
            this.props.HomeActionsCreator.getHomeData(request);
        }
        if (this.state.getHomeData) {
            this.props.toggleShowLoading(false);
        }
    }

    handleVideoItemClick = (videoItemInfo) => {
        this.props.PlayActionsCreator.getPlayDataStart(videoItemInfo);
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
                            this.state.homeData.length === 0
                                ? <div>No-Data</div>
                                : formatData.videoRespondData(this.state.homeData.items).map((item) => {
                                    return (
                                        <VideoItem
                                            key={item.id}
                                            videoItemData={item}
                                            itemClickAction={this.handleVideoItemClick}
                                        />
                                    );
                                })
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