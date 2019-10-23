import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';

const DividerView = styled.div`
    height: 4vh;
    minHeight: 60px;
`;

export default class PageDivider extends Component {
    render() {
        const {dividerData} = {...this.props};
        return (
            <DividerView>
                <Divider orientation="left">{dividerData.title}</Divider>
            </DividerView>
        );
    }
}

PageDivider.propTypes = {
    dividerData: PropTypes.object.isRequired,
};
