import React, {Component} from 'react';
import is from 'is_js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, SearchRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {AdvancedSearch} from '../../Components/Layout';
import {VideoListPlayItem} from '../../Components/Modules';
import {formatData} from '../../Common/BasicService';
// import {searchApi} from '../../ApiCenter/Api/Api';
// import * as ComponentConfig from '../../Common/ComponentConfig';

const SearchView = styled.div`
    width: 100%;
    height: 94vh;
`;

const SearchContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const scrollContainerStyle = {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    padding: '7vh 8vw 0 8vw',
};

const VideoListPlayItemConfig = {
    width: '100%',
    marginBottom: '1rem',
    displayWidth: 320,
    playerConfig: {
        width: '320px',
        height: '180px',
        defaultControls: false,
        showControl: false,
        defaultPlay: true,
        mute: true
    },
    playerInlineConfig: {
        minWidth: '600px',
        minHeight: '18px'
    }
};

@CheckAuthHOC
@LoadingDataHOC
class Search extends Component {
    
    constructor() {
        super();
        this.searchContainerScroll = React.createRef();
        this.state = {
            getSearchStatus: false,
            searchKey: '',
            searchType: '',
            nextPageToken: '',
            publishedAfter: '',
            currentSearchDataIndex: 0,
            searchResult: [],
        };
    }
    
    componentDidMount() {
        this.searchContainerScroll.current.addEventListener('scroll', this.lazyLoadingScroll);
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            // case SearchRedux.InitialSearchActions.getInitialSearchSuccess:
            //     return {
            //         getSearchStatus: true,
            //         searchKey: nextProps.action.payload.config.params.q,
            //         nextPageToken: nextProps.action.payload.nextPageToken,
            //         currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
            //         searchResult: nextProps.action.payload.items
            //     };
            // case SearchRedux.NextSearchActions.getNextSearchSuccess:
            //     return {
            //         getSearchStatus: true,
            //         searchKey: nextProps.payload.config.params.q,
            //         nextPageToken: nextProps.action.payload.nextPageToken,
            //         currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
            //         searchResult: nextProps.action.payload.items
            //     };
            case SearchRedux.ClearSearchActions.clearSearchData:
                return {
                    getSearchStatus: false,
                    searchKey: '',
                    nextPageToken: '',
                    currentSearchDataIndex: 0,
                    searchResult: []
                };
            case SearchRedux.InitialSearchActions.getInitialSearchSuccess:
                return {
                    getSearchStatus: true,
                    searchKey: 'you',
                    nextPageToken: Math.random().toString(36).substring(7),
                    currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
                    searchResult: nextProps.action.payload.items
                };
            case SearchRedux.NextSearchActions.getNextSearchSuccess:
                return {
                    getSearchStatus: true,
                    searchKey: 'you',
                    nextPageToken: Math.random().toString(36).substring(7),
                    currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
                    searchResult: nextProps.action.payload.items
                };
            default:
                break;
        }
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (is.all.truthy(prevState)) {
            this.props.toggleShowLoading(false);
        }
        
        if (!this.state.getSearchStatus) {
            this.setState({
                getSearchStatus: false,
                searchKey: '',
                nextPageToken: 0,
                currentSearchDataIndex: 0,
                searchResult: []
            });
        }
        
        if (this.state.currentSearchDataIndex === prevState.currentSearchDataIndex + 1) {
            this.setState({
                getSearchStatus: true,
                searchKey: 'you',
                nextPageToken: prevProps.action.payload.nextPageToken,
                currentSearchDataIndex: this.state.currentSearchDataIndex,
                searchResult: [...prevProps.action.payload.items.reverse(), ...this.state.searchResult]
            });
        }
    }
    
    componentWillUnmount() {
        this.searchContainerScroll.current.removeEventListener('scroll', this.lazyLoadingScroll, false);
    }
    
    lazyLoadingScroll = () => {
        if (this.searchContainerScroll.current.scrollTop
            + this.searchContainerScroll.current.clientHeight
            >= this.searchContainerScroll.current.scrollHeight
        ) {
            this.getNextLoadSearchData();
        }
    };
    
    getNextLoadSearchData = () => {
        // const nextLoadSearchRequest = searchApi.createRequest(
        //     'snippet',
        //     10,
        //     this.state.searchKey,
        //     this.state.nextPageToken,
        //     this.state.searchType,
        //     this.state.publishedAfter,
        // );
        // this.props.SearchActionsCreator.getNextSearchResultData(
        //     nextLoadSearchRequest,
        //     this.state.currentSearchDataIndex
        // );
        this.props.SearchActionsCreator.testNextSearchResultData(
            this.state.searchKey,
            this.state.currentSearchDataIndex
        );
    };
    
    render() {
        return (
            <div>
                <SearchView>
                    <SearchContent>
                        <div
                            style={scrollContainerStyle}
                            ref={this.searchContainerScroll}
                        >
                            <AdvancedSearch searchKey={this.state.searchKey}/>
                            {
                                this.state.getSearchStatus ? formatData.videoListPlayItemRespond(this.state.searchResult).map((item) => {
                                    return (
                                        <VideoListPlayItem
                                            key={item.id}
                                            VideoListPlayItemConfig={VideoListPlayItemConfig}
                                            VideoListPlayItemData={
                                                {
                                                    title: item.title,
                                                    description: item.description,
                                                    playData: item.playData,
                                                    thumbnailURL: item.imgURL
                                                }
                                            }
                                        />
                                    );
                                }) : null
                            }
                        </div>
                    </SearchContent>
                </SearchView>
            </div>
        );
    }
}

Search.propTypes = {
    // action: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    SearchActionsCreator: PropTypes.object.isRequired,
    toggleShowLoading: PropTypes.func
};

export default connect(
    (state) => {
        return {action: state.SearchReducer.action};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            SearchActionsCreator: bindActionCreators(SearchRedux.SearchActionsCreator, dispatch),
        };
    }
)(Search);