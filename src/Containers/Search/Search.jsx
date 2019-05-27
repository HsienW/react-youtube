import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Header} from '../../Components/Layout';
import {VideoListItem, ListDropdown} from '../../Components/Modules';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalActionsCreator} from '../../Redux/Modules/Portal/PortalRedux';
import * as SearchRedux from '../../Redux/Modules/Search/SearchRedux';
import * as ComponentConfig from '../../Common/ComponentConfig';
import * as Style from '../../Common/Style';
// import {AsyncDataSourceHOC} from '../../Decorators/index';
// import {formatData} from '../../Common/BasicService';

const SearchView = styled.div`
    padding: 0 8%;
    height: 90vh;
    width: 100%;
`;

const SearchContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const AdvancedSearch = styled.div`
    height: 4vh;
    minHeight: 60px;
`;

const videoItemData = {
    id: '123',
    title: 'test',
    imgURL: 'https://i.ytimg.com/vi/zymgtV99Rko/mqdefault.jpg',
    description: 'testtesttesttesttest'
};

const btnConfig = {
    color: `${Style.FontStressColor}`,
    border: 0,
    marginLeft: 8
};

const videoListItemConfig = {
    width: '100%',
    height: '180px',
};

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getSearchData: false,
            searchResultData: []
        };
    }

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case SearchRedux.SearchActions.getSearchSuccess:
                return {getSearchData: true, searchResultData: nextProps.action.payload};

            default:
                break;
        }
        return null;
    }

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
                        <VideoListItem
                            key={videoItemData.id}
                            videoItemData={videoItemData}
                            videoListItemConfig={videoListItemConfig}
                        />
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

// {
//                             this.state.searchResultData.length === 0
//                                 ? <div>No Date</div>
//                                 : formatData.videoRespondData(this.state.searchResultData).map((item) => {
//                                     return (
//                                         <VideoListItem
//                                             key={item.id}
//                                             videoItemData={item}
//                                         />
//                                     );
//                                 })
//                         }
