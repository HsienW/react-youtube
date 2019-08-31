import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class UploadEditor extends Component {
    render() {
        return (
            <div>
                UploadEditor
            </div>
        );
    }
}

UploadEditor.propTypes = {
    configData: PropTypes.object.isRequired,
    // itemClickAction: PropTypes.func.isRequired
};