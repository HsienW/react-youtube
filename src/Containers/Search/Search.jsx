import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
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
    height: 90vh;
`;

const SearchContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 2% 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const AdvancedSearch = styled.div`
    height: 4vh;
    minHeight: 60px;
`;

const infiniteScrollDomStyle = {
    width: '100%',
    height: '600px',
    padding: '0 8%',
    overflow: 'auto'
};

const btnConfig = {
    color: `${Style.FontStressColor}`,
    border: 0,
    marginLeft: 8
};

const VideoListPlayItemConfig = {
    width: '100%',
    marginBottom: '2rem',
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
        this.state = {
            getSearchData: false,
            searchKey: '',
            nextPageToken: '',
            searchResultData: []
        };
    }

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case SearchRedux.SearchActions.getSearchSuccess:
                return {
                    getSearchData: true,
                    searchKey: 'you',
                    nextPageToken: nextProps.action.payload.nextPageToken,
                    searchResultData: nextProps.action.payload.items
                };

            default:
                break;
        }
        return null;
    }

    getNextLoadSearchData = () => {
        const request = {
            part: 'snippet',
            maxResults: 2,
            q: this.state.searchKey,
            type: 'video',
            pageToken: this.state.nextPageToken,
            key: googleApiKey
        };
        this.props.SearchActionsCreator.testSearchResultData(request);
    };

    render() {
        return (
            <div>
                <Header/>
                <SearchView>
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
                    <div style={infiniteScrollDomStyle} ref={(ref) => this.scrollParentRef = ref}>
                        <InfiniteScroll
                            threshold={500}
                            // isReverse={}
                            hasMore={true}
                            loadMore={this.getNextLoadSearchData}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                            // loader={<div className="loader" key={0}>Loading ...</div>}
                        >
                            <SearchContent>
                                {
                                    this.state.getSearchData
                                        ? formatData.videoListPlayItemRespond(this.state.searchResultData.items).map((item) => {
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
                                        })
                                        : <div>No-Data</div>
                                }
                            </SearchContent>
                        </InfiniteScroll>
                    </div>
                </SearchView>
            </div>
        );
    }
}

Search.propTypes = {
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
