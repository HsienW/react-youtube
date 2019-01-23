import React, {Component} from 'react';
import styled from 'styled-components';

const SearchView = styled.div`
    padding: 0 10%;
`;


export default class Search extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <SearchView>
                SearchView
            </SearchView>
        );
    }
}
