import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, SearchRedux} from '../../Redux/Modules';
import {CheckAuthHOC, LoadingDataHOC} from '../../Decorators/index';
import {Header, AdvancedSearch} from '../../Components/Layout';
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
    height: '88vh',
    overflow: 'auto',
    padding: '0 8%',
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
    
    constructor(props) {
        super(props);
        this.searchContainerScroll = React.createRef();
        this.state = {
            searchStatus: false,
            searchKey: '',
            searchType: '',
            nextPageToken: '',
            publishedAfter: '',
            currentSearchDataIndex: 0,
            searchResult: [],
        };
    }
    
    componentDidMount() {
        this.searchContainerScroll.current.addEventListener('scroll', () => {
            if (this.searchContainerScroll.current.scrollTop
                + this.searchContainerScroll.current.clientHeight
                >= this.searchContainerScroll.current.scrollHeight
            ) {
                this.getNextLoadSearchData();
            }
        });
    }
    
    static getDerivedStateFromProps(nextProps) {
        // nextProps.action.payload.config.params.q
        switch (nextProps.action.type) {
            // case SearchRedux.InitialSearchActions.getInitialSearchSuccess:
            //     return {
            //         searchStatus: true,
            //         searchKey: nextProps.payload.config.params.q,
            //         nextPageToken: nextProps.action.payload.nextPageToken,
            //         currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
            //         searchResult: nextProps.ac tion.payload.items
            //     };
            // case SearchRedux.NextSearchActions.getNextSearchSuccess:
            //     return {
            //         searchStatus: true,
            //         searchKey: nextProps.payload.config.params.q,
            //         nextPageToken: nextProps.action.payload.nextPageToken,
            //         currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
            //         searchResult: nextProps.action.payload.items
            //     };
            case SearchRedux.ClearSearchActions.clearSearchData:
                return {
                    searchStatus: false,
                    searchKey: '',
                    nextPageToken: '',
                    currentSearchDataIndex: 0,
                    searchResult: []
                };
            case SearchRedux.InitialSearchActions.getInitialSearchSuccess:
                return {
                    searchStatus: true,
                    searchKey: 'you',
                    nextPageToken: Math.random().toString(36).substring(7),
                    currentSearchDataIndex: nextProps.action.payload.currentSearchDataIndex,
                    searchResult: nextProps.action.payload.items
                };
            case SearchRedux.NextSearchActions.getNextSearchSuccess:
                return {
                    searchStatus: true,
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
        if (!this.state.searchStatus) {
            this.setState({
                searchStatus: false,
                searchKey: '',
                nextPageToken: 0,
                currentSearchDataIndex: 0,
                searchResult: []
            });
        }
        if (this.state.currentSearchDataIndex === prevState.currentSearchDataIndex + 1) {
            this.setState({
                searchStatus: true,
                searchKey: 'you',
                nextPageToken: prevProps.action.payload.nextPageToken,
                currentSearchDataIndex: this.state.currentSearchDataIndex,
                searchResult: [...prevProps.action.payload.items.reverse(), ...this.state.searchResult]
            });
        }
    }
    
    getNextLoadSearchData = () => {
        // const request = searchApi.createRequest(
        //     'snippet',
        //     10,
        //     this.state.searchKey,
        //     this.state.nextPageToken,
        //     this.state.searchType,
        //     this.state.publishedAfter,
        // );
        // this.props.SearchActionsCreator.getNextSearchResultData(
        //     request,
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
                <Header/>
                <SearchView>
                    <SearchContent>
                        <div
                            style={scrollContainerStyle}
                            ref={this.searchContainerScroll}
                        >
                            <AdvancedSearch searchKey={this.state.searchKey}/>
                            {
                                this.state.searchStatus ? formatData.videoListPlayItemRespond(this.state.searchResult).map((item) => {
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
                                }) : <div>No-Data</div>
                            }
                        </div>
                    </SearchContent>
                </SearchView>
            </div>
        );
    }
}

Search.propTypes = {
    action: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    SearchActionsCreator: PropTypes.object.isRequired,
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