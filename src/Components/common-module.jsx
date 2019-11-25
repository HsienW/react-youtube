import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, ActionAlert} from './Layout';

export class CommonModule extends Component {
    
    render() {
        return (
            <div>
                <Header/>
                <ActionAlert/>
                {this.props.children}
            </div>
        );
    }
}


CommonModule.propTypes = {
    children: PropTypes.object.isRequired,
};
