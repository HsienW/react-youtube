import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-final-form';
import {ListDropdown} from '../../Modules';
import {SearchActionsCreator} from '../../../Redux/Modules/Search/SearchRedux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const Advanced = styled.div`
    min-height: 32px;
    margin-bottom: 1rem;
`;

class AdvancedSearch extends Component {

    onAdvancedSearch = () => {
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb');
        console.log(this.props.SearchActionsCreator.testInitialSearchResultData);
        // part, maxResults, searchKey, pageToken, type, publishedAfter, publishedBefore
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
        const {btnConfig} = {...this.props};
        return (
            <Form render={() => (
                <Advanced>
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
            )}/>
        );
    }
}

AdvancedSearch.propTypes = {
    btnConfig: PropTypes.object.isRequired,
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