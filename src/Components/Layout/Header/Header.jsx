import React, {Component} from 'react';
import {Button, Input} from 'antd';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';

const Search = Input.Search;

const HeaderView = styled.div`
    width: 100%;
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${Style.MainColor}
`;

const profileArea = {
    width: '16%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};

const btnStyle = {
    color: `${Style.FontMainColor}`,
    backgroundColor: `${Style.MainColor}`,
};

class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HeaderView>
                <Button style={btnStyle}>Home</Button>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{width: 500}}
                />
                <div style={profileArea}>
                    <Button style={btnStyle}>Upload</Button>
                    <Button style={btnStyle}>Prompt</Button>
                    <Button style={btnStyle}>Profile</Button>
                </div>
            </HeaderView>
        );
    }
}

export default Header;