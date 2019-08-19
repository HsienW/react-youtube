import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {SelectDropdown} from '../../Modules';
import {SearchRedux} from '../../../Redux/Modules';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {formatComponentData} from '../../../Common/BasicService';
// import {searchApi} from '../../../ApiCenter/Api/Api';
import * as StyleConfig from '../../../Common/StyleConfig';
import * as ComponentConfig from '../../../Common/ComponentConfig';

const AdvancedView = styled.div`
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
    color: `${StyleConfig.FontStressColor}`,
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
            dateCondition: formatComponentData.advancedSearchDate(conditionValue)
        }, () => {
            this.onAdvancedSearch();
        });
    };
    
    onTypeSearchCondition = (conditionValue) => {
        this.setState({
            typeCondition: formatComponentData.advancedSearchType(conditionValue)
        }, () => {
            this.onAdvancedSearch();
        });
    };
    
    onAdvancedSearch = () => {
        // const advancedSearchRequest = searchApi.createRequest(
        //     'snippet',
        //     10,
        //     this.props.searchKey,
        //     '',
        //     this.state.typeCondition,
        //     this.state.dateCondition,
        // );
        // this.props.SearchActionsCreator.getInitialSearchResultData(advancedSearchRequest, 0);
        this.props.SearchActionsCreator.testInitialSearchResultData(
            this.props.searchKey,
            '',
            0
        );
    };
    
    render() {
        return (
            <AdvancedView>
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
            </AdvancedView>
        );
    }
}

AdvancedSearch.propTypes = {
    searchKey: PropTypes.string.isRequired,
    SearchActionsCreator: PropTypes.object.isRequired
};

export default connect(
    (state) => {
        return {action: state.SearchReducer.action};
    },
    (dispatch) => {
        return {
            SearchActionsCreator: bindActionCreators(SearchRedux.SearchActionsCreator, dispatch),
        };
    }
)(AdvancedSearch);