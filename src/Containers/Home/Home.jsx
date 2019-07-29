import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, HomeRedux, PlayRedux} from '../../Redux/Modules';
import {PageHeader, VideoItem} from '../../Components/Modules/index';
import {Header} from '../../Components/Layout/index';
import {CheckAuthHOC} from '../../Decorators/index';
import {formatData} from '../../Common/BasicService';
import {videoApi} from '../../ApiCenter/Api/Api';
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

@CheckAuthHOC
// @LoadingDataHOC
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getHomeStatus: false,
            homeData: []
        };
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

    // componentDidUpdate() {
    //     if (this.state.getHomeStatus) {
    //         // this.props.toggleShowLoading(false);
    //     }
    // }

    videoItemClick = (videoItemInfo) => {
        const request = videoApi.createDetailRequest('', videoItemInfo.id);
        this.props.PlayActionsCreator.getPlayData(request, videoItemInfo);
        // this.props.PlayActionsCreator.getPlayVideoData(videoItemInfo);
        // this.props.PlayActionsCreator.getPlayDetailData(request);
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