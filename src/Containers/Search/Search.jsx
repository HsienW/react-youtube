import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import InfiniteScroll from 'react-infinite-scroller';
import {Header} from '../../Components/Layout';
import {VideoListPlayItem, ListDropdown} from '../../Components/Modules';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalActionsCreator} from '../../Redux/Modules/Portal/PortalRedux';
import {formatData} from '../../Common/BasicService';
// import {googleApiKey} from '../../ApiCenter/Api/Api';
import * as SearchRedux from '../../Redux/Modules/Search/SearchRedux';
import * as ComponentConfig from '../../Common/ComponentConfig';
import * as Style from '../../Common/Style';

const SearchView = styled.div`
    width: 100%;
    height: 90vh;
    padding: 0 8%;
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
        defaultPlay: false,
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
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        console.log(nextProps.action.payload);
        switch (nextProps.action.type) {
            case SearchRedux.SearchActions.getSearchSuccess:
                return {
                    getSearchData: true,
                    searchKey: nextProps.action.payload.config.params.q,
                    nextPageToken: nextProps.action.payload.data.nextPageToken,
                    searchResultData: nextProps.action.payload.data
                };

            default:
                break;
        }
        return null;
    }

    // getNextLoadSearchData = () => {
    //     const request = {
    //         part: 'snippet',
    //         maxResults: 50,
    //         q: this.state.searchKey,
    //         type: 'video',
    //         pageToken: '',
    //         key: googleApiKey
    //     };
    //     console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    //     console.log(request);
    //     // this.props.SearchActionsCreator.getSearchResultData(request);
    // };

    render() {
        return (
            <div>
                <Header/>
                <SearchView>`
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
                                                    playData: item.playData
                                                }
                                            }
                                        />
                                    );
                                })
                                : <div>No Date</div>
                        }
                    </SearchContent>
                </SearchView>
            </div>
        );
    }
}

Search.propTypes = {
    PortalActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.SearchReducer.action};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalActionsCreator, dispatch)
        };
    }
)(Search);
