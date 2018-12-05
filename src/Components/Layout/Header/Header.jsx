import React, {Component} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';

const HeaderView = styled.div`
    width: 100%;
    height: 56px;
    padding: 0 16px;
    background-color: ${Style.MainColor}
`;

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
            </HeaderView>
        );
    }
}

export default Header;