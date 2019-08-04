import React, {Component} from 'react';
import {Divider} from 'antd';
import styled from 'styled-components';

const PageHeaderView = styled.div`
    height: 4vh;
    minHeight: 60px;
`;

export default class PageHeader extends Component {
    render() {
        return (
            <PageHeaderView>
                <Divider orientation="left">Recommend</Divider>
            </PageHeaderView>
        );
    }
}
