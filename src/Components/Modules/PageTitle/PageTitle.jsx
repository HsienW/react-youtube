import React, {Component} from 'react';
import {Divider} from 'antd';

import styled from 'styled-components';

const PageTitleView = styled.div`
    height: 50px;
`;

export default class PageTitle extends Component {
    render() {
        return (
            <PageTitleView>
                <Divider orientation="left">Left Text</Divider>
            </PageTitleView>
        );
    }
}
