import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalRedux, SearchRedux} from '../../Redux/Modules';
import {Header} from '../../Components/Layout';
import {VideoListPlayItem, ListDropdown} from '../../Components/Modules';
import {formatData} from '../../Common/BasicService';
import {googleApiKey} from '../../ApiCenter/Api/Api';
import * as ComponentConfig from '../../Common/ComponentConfig';
import * as Style from '../../Common/Style';

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

const AdvancedSearch = styled.div`
    min-height: 32px;
    margin-bottom: 1rem;
`;

const scrollContainerStyle = {
    width: '100%',
    height: '88vh',
    overflow: 'auto',
    padding: '0 8%',
};

const btnConfig = {
    color: `${Style.FontStressColor}`,
    border: 0,
    marginRight: 8
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

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.searchContainerScroll = React.createRef();
        this.state = {
            searchStatus: false,
            searchKey: '',
            nextPageToken: '',
            currentSearchDataIndex: 0,
            searchResult: [],
        };
    }
    
    static getDerivedStateFromProps(nextProps) {
        // nextProps.action.payload.config.params.q
        switch (nextProps.action.type) {
            case SearchRedux.SearchActions.getSearchSuccess:
                return {
                    searchStatus: true,
                    searchKey: nextProps.payload.config.params.q,
                    nextPageToken: nextProps.action.payload.nextPageToken,
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
    
    componentDidUpdate(prevProps, prevState) {
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
    
    createSearchRequest = (part, maxResults, type) => {
        // const request = {
        //     part: 'snippet',
        //     maxResults: 10,
        //     q: this.state.searchKey,
        //     type: 'video',
        //     pageToken: this.state.nextPageToken,
        //     key: googleApiKey
        // };
        let request = {
            part: part,
            maxResults: maxResults,
            q: this.state.searchKey,
            type: type,
            pageToken: this.state.nextPageToken,
            key: googleApiKey,
            publishedAfter: '',
            publishedBefore: ''
        };
        return request;
    };
    
    getNextLoadSearchData = () => {
        // this.props.SearchActionsCreator.testSearchResultData(
        //     this.createSearchRequest('snippet', 10, 'video'),
        //     this.state.currentSearchDataIndex
        // );
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
                            <AdvancedSearch>
                                <ListDropdown
                                    configData={ComponentConfig.DateSearchDropdown}
                                    btnConfig={btnConfig}
                                    itemClickAction={this.props.PortalActionsCreator.changeToPage}
                                />
                                <ListDropdown
                                    configData={ComponentConfig.TypeSearchDropdown}
                                    btnConfig={btnConfig}
                                    itemClickAction={this.props.PortalActionsCreator.changeToPage}
                                />
                            </AdvancedSearch>
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