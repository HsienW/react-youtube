import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'antd';
import {WebStorage, WebStorageKeys} from '../../../Common/WebStorage';
import {ListDropdown, SubscribeNotice} from '../../Modules';
import {PortalRedux, HeaderRedux, HomeRedux, SearchRedux} from '../../../Redux/Modules';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {headerApi, searchApi} from '../../../ApiCenter/Api/Api';
import styled from 'styled-components';
import * as StyleConfig from '../../../Common/StyleConfig';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const Search = Input.Search;

const HeaderView = styled.div`
    width: 100%;
    height: 6vh;
    minHeight: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${StyleConfig.MainColor}
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

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    }
];

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
        this.setState({currentSearchKey: WebStorage.getSessionStorage(WebStorageKeys.SEARCH_KEY)});
    }
    
    static getDerivedStateFromProps(nextProps) {
        console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
        console.log(nextProps.action);
        switch (nextProps.action.type) {
            case HeaderRedux.SubscribeActions.getSubscribeSuccess:
                return {getSubscribeStatus: true, homeData: nextProps.action.payload};
            
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
    
    onSearch = (searchKey) => {
        WebStorage.setSessionStorage(WebStorageKeys.SEARCH_KEY, searchKey);
        this.getSearchAllData();
    };
    
    onProfileDropdownClick = (itemKey) => {
        switch (itemKey) {
            case 'on-my-channel':
                // this.props.PortalActionsCreator.changeToPage('channel');
                return;
            
            case 'on-logout':
                WebStorage.removeSessionStorage(WebStorageKeys.ACCESS_TOKEN);
                WebStorage.removeSessionStorage(WebStorageKeys.VIDEO_ITEM_INFO);
                WebStorage.removeSessionStorage(WebStorageKeys.SEARCH_KEY);
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
            WebStorage.getSessionStorage(WebStorageKeys.SEARCH_KEY),
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
            '',
            true,
            5,
            WebStorage.getSessionStorage(WebStorageKeys.SEARCH_KEY),
        );
        this.props.HeaderActionsCreator.getSubscribeNoticeData(request);
    };
    
    render() {
        return (
            <HeaderView>
                <Button
                    style={btnConfig}
                    onClick={this.onGoHome}
                >
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
                        itemClickAction={this.props.PortalActionsCreator.changeToPage}
                    />
                    <SubscribeNotice
                        configData={ComponentConfig.NoticeDropdown}
                        btnConfig={btnConfig}
                        subscribeNoticeData={data}
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
    PortalActionsCreator: PropTypes.object.isRequired,
    HeaderActionsCreator: PropTypes.object.isRequired,
    HomeActionsCreator: PropTypes.object.isRequired,
    SearchActionsCreator: PropTypes.object.isRequired
};

export default connect(
    (state) => {
        return {action: state.PortalReducer.action};
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