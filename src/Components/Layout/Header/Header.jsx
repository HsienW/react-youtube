import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import {WebStorage, WebStorageKeys} from '../../../Common/WebStorage';
import {ListDropdown, SubscribeNotice} from '../../Modules';
import {PortalRedux, HeaderRedux, HomeRedux, SearchRedux} from '../../../Redux/Modules';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {headerApi, searchApi} from '../../../ApiCenter/Api/Api';
import {formatData} from '../../../Common/BasicService';
import styled from 'styled-components';
import * as StyleConfig from '../../../Common/StyleConfig';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const Search = Input.Search;

const HeaderView = styled.div`
    width: 100%;
    height: 7vh;
    minHeight: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${StyleConfig.MainColor};
    position: fixed;
    z-index: 100;
`;

const profileArea = {
    width: '18%',
    minWidth: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};

const searchBarStyle = {
    width: '40%',
    minWidth: '500px'
};

const btnConfig = {
    color: `${StyleConfig.FontMainColor}`,
    backgroundColor: `${StyleConfig.MainColor}`,
    marginRight: 8
};

class Header extends Component {
    
    constructor() {
        super();
        this.state = {
            currentSearchKey: '',
            getSubscribeStatus: false,
            subscribeData: []
        };
    }
    
    componentDidMount() {
        this.getSubscribeAllData();
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case HeaderRedux.SubscribeActions.getSubscribeSuccess:
                return {getSubscribeStatus: true, subscribeData: nextProps.action.payload.data.items};
            
            default:
                break;
        }
        
        return null;
    }
    
    onSearchKeyChange = (searchKeyChange) => {
        this.setState({currentSearchKey: searchKeyChange.target.value});
    };
    
    onGoHome = () => {
        this.props.PortalActionsCreator.changeToPage('home');
    };
    
    onSearch = () => {
        this.getSearchAllData();
    };
    
    onGoUpload = () => {
        this.props.PortalActionsCreator.changeToPage('my-upload');
    };
    
    onProfileDropdownClick = (itemKey) => {
        switch (itemKey) {
            case 'on-my-channel':
                this.props.PortalActionsCreator.changeToPage('my-channel');
                return;
            
            case 'on-logout':
                WebStorage.clearSessionStorage();
                this.props.PortalActionsCreator.changeToPage('auth');
                return;
            
            default:
                return;
        }
    };
    
    getSearchAllData = () => {
        const request = searchApi.createRequest(
            'snippet',
            10,
            this.state.currentSearchKey,
            '',
            '',
            '',
        );
        // this.props.SearchActionsCreator.getInitialSearchResultData(request, 0);
        this.props.SearchActionsCreator.testInitialSearchResultData(request, 'video', 0);
        this.props.PortalActionsCreator.changeToPage('search');
    };
    
    getSubscribeAllData = () => {
        const request = headerApi.createSubscribeRequest(
            'snippet,contentDetails',
            true,
            5,
            WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN),
        );
        this.props.HeaderActionsCreator.getSubscribeNoticeData(request);
    };
    
    render() {
        return (
            <HeaderView>
                <Button style={btnConfig} onClick={this.onGoHome}>
                    Home
                </Button>
                <Search
                    placeholder="Search"
                    value={this.state.currentSearchKey}
                    style={searchBarStyle}
                    onChange={this.onSearchKeyChange}
                    onSearch={searchKey => this.onSearch(searchKey)}
                />
                <div style={profileArea}>
                    <ListDropdown
                        configData={ComponentConfig.UploadDropdown}
                        btnConfig={btnConfig}
                        itemClickAction={this.onGoUpload}
                    />
                    <SubscribeNotice
                        configData={ComponentConfig.NoticeDropdown}
                        btnConfig={btnConfig}
                        subscribeNoticeData={formatData.subscribeNoticeDetailRespond(this.state.subscribeData)}
                    />
                    <ListDropdown
                        configData={ComponentConfig.ProfileDropdown}
                        btnConfig={btnConfig}
                        itemClickAction={profileItem => this.onProfileDropdownClick(profileItem.key)}
                    />
                </div>
            </HeaderView>
        );
    }
}

Header.propTypes = {
    location: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    HeaderActionsCreator: PropTypes.object.isRequired,
    HomeActionsCreator: PropTypes.object.isRequired,
    SearchActionsCreator: PropTypes.object.isRequired
};

export default connect(
    (state) => {
        return {action: state.HeaderReducer.action};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            HeaderActionsCreator: bindActionCreators(HeaderRedux.HeaderActionsCreator, dispatch),
            HomeActionsCreator: bindActionCreators(HomeRedux.HomeActionsCreator, dispatch),
            SearchActionsCreator: bindActionCreators(SearchRedux.SearchActionsCreator, dispatch),
        };
    }
)(Header);
