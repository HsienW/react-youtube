import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Style from '../../../Common/Style';

const VideoDesc = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 2%;
`;

const DescTitle = styled.div`
    font-size: 1.8rem;
`;

const DescRelease = styled.div`
    color: ${Style.FontStressColor}
`;

const DescInfo = styled.div`
    padding: 2% 0;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
`;

export default class VideoDescription extends Component {

    render() {
        const {descriptionData} = {...this.props};
        return (
            <VideoDesc>
                <DescTitle>{descriptionData.title}</DescTitle>
                <DescRelease>Release: {descriptionData.release}</DescRelease>
                <DescInfo>
                    {descriptionData.contentInfo}
                </DescInfo>
            </VideoDesc>
        );
    }
}

VideoDescription.propTypes = {
    descriptionData: PropTypes.object.isRequired,
};
