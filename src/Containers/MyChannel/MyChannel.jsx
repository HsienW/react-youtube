import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MyChannelRedux} from '../../Redux/Modules';
// import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {Header, MyChannelBanner} from '../../Components/Layout';
import {channelApi} from '../../ApiCenter/Api/Api';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
// import {Menu, Icon} from 'antd';

const MyChannelView = styled.div`
    padding: 0 8%;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const myChannelBannerConfig = {
    avatarSize: 80,
};

// @CheckAuthHOC
// @LoadingDataHOC
class MyChannel extends Component {
    
    constructor() {
        super();
        this.state = {
            getMyChannelStatus: false,
            myChannelData: [],
            current: 'mail',
        };
    }
    
    componentDidMount() {
        this.getMyChannelAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case MyChannelRedux.MyChannelActions.getMyChannelSuccess:
                return {getMyChannelStatus: true, myChannelData: nextProps.action.payload.data.items};
            
            default:
                break;
        }
        
        return null;
    }
    
    getMyChannelAllData = () => {
        const myChannelRequest = channelApi.createMyChannelRequest(
            'snippet,contentDetails,statistics',
            true,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
            20,
        );
        this.props.MyChannelActionsCreator.getMyChannelData(myChannelRequest);
    };
    
    // handleClick = (e) => {
    //     console.log('click ', e);
    //     this.setState({
    //         current: e.key,
    //     });
    // };
    
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
                        </MyChannelView>
                        : <div>No-Data</div>
                }
            </div>
        );
    }
}

// myChannelData: PropTypes.object.isRequired,
//     myChannelConfig: PropTypes.object.isRequired

MyChannel.propTypes = {
    history: PropTypes.object.isRequired,
    MyChannelActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.MyChannelReducer.action};
    },
    (dispatch) => {
        return {
            MyChannelActionsCreator: bindActionCreators(MyChannelRedux.MyChannelActionsCreator, dispatch)
        };
    }
)(MyChannel);
