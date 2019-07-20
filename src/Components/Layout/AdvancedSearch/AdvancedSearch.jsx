import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SelectDropdown} from '../../Modules';
import {SearchActionsCreator} from '../../../Redux/Modules/Search/SearchRedux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {formatData} from '../../../Common/BasicService';
import {searchApi} from '../../../ApiCenter/Api/Api';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const Advanced = styled.div`
    min-height: 70px;
    margin: 1rem 0;
    display: flex;
`;

const AdvancedCondition = styled.div`
    width: 100px;
    margin-right: 8px;
`;

const btnConfig = {
    width: 100,
    color: `${Style.FontStressColor}`,
    border: 0,
    marginRight: 8
};

class AdvancedSearch extends Component {
    
    state = {
        advancedState: false,
        dateCondition: '',
        typeCondition: '',
    };
    
    onDateSearchCondition = (conditionValue) => {
        this.setState({
            dateCondition: formatData.advancedSearchDate(conditionValue)
        }, () => {
            this.onAdvancedSearch();
        });
    };
    
    onTypeSearchCondition = (conditionValue) => {
        this.setState({
            typeCondition: formatData.advancedSearchType(conditionValue)
        }, () => {
            this.onAdvancedSearch();
        });
    };
    
    onAdvancedSearch = () => {
        const request = searchApi.createRequest(
            'snippet',
            10,
            'you',
            '',
            this.state.typeCondition,
            this.state.dateCondition,
            this.state.dateCondition,
        );
        
        console.log('tttttttttttttttttttttttt');
        console.log(request);
        console.log(this.state);
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
                <AdvancedCondition>
                    <p>Date</p>
                    <SelectDropdown
                        configData={ComponentConfig.DateSearchDropdown}
                        btnConfig={btnConfig}
                        itemClickAction={this.onDateSearchCondition}
                    />
                </AdvancedCondition>
                <AdvancedCondition>
                    <p>Type</p>
                    <SelectDropdown
                        configData={ComponentConfig.TypeSearchDropdown}
                        btnConfig={btnConfig}
                        itemClickAction={this.onTypeSearchCondition}
                    />
                </AdvancedCondition>
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