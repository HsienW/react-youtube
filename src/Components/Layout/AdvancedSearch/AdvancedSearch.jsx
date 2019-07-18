import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListDropdown, SelectDropdown} from '../../Modules';
import {SearchActionsCreator} from '../../../Redux/Modules/Search/SearchRedux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {formatData} from '../../../Common/BasicService';
// import {searchApi} from '../../../ApiCenter/Api/Api';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const Advanced = styled.div`
    min-height: 32px;
    margin-bottom: 1rem;
`;

const btnConfig = {
    width: 100,
    color: `${Style.FontStressColor}`,
    border: 0,
    marginRight: 8
};

class AdvancedSearch extends Component {
    
    onAdvancedSearch = (condition) => {
    
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb');
        console.log(condition);
        
        // let currentTime = '';
        // let currentType = '';

        // if (event.item.props.type === 'Date') {
        //     currentTime = formatData.advancedSearchTime(event.item.props.children[1]);
        // }
        // currentType = formatData.advancedSearchType(event.item.props.children[1]);
    
    
        // const request = searchApi.createRequest(
        //     part,
        //     maxResults,
        //     searchKey,
        //     pageToken,
        //     type,
        //     publishedAfter,
        //     publishedBefore
        // );
        // this.props.SearchActionsCreator.getInitialSearchResultData(request, 0);
        // this.props.SearchActionsCreator.getInitialSearchResultData(
        //     searchApi.createRequest(
        //         'snippet',
        //         10,
        //         this.state.searchKey,
        //         '',
        //         'video',
        //         '',
        //         ''
        //     ), 0
        // );
        // this.props.SearchActionsCreator.testInitialSearchResultData(searchKey, 'video', 0);
    };
    
    render() {
        return (
            <Advanced>
                <SelectDropdown
                    configData={ComponentConfig.DateSearchDropdown}
                    btnConfig={btnConfig}
                    itemClickAction={this.onAdvancedSearch}
                />
                <ListDropdown
                    configData={ComponentConfig.DateSearchDropdown}
                    btnConfig={btnConfig}
                    itemClickAction={this.onAdvancedSearch}
                />
                <ListDropdown
                    configData={ComponentConfig.TypeSearchDropdown}
                    btnConfig={btnConfig}
                    itemClickAction={this.onAdvancedSearch}
                />
            </Advanced>
        );
    }
}

AdvancedSearch.propTypes = {
    SearchActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.SearchReducer.action};
    },
    (dispatch) => {
        return {
            SearchActionsCreator: bindActionCreators(SearchActionsCreator, dispatch),
        };
    }
)(AdvancedSearch);