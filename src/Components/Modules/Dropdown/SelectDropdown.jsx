import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';

const {Option} = Select;

export default class SelectDropdown extends Component {
    
    selectItemChange = (event) => {
        this.props.itemClickAction(event);
    };
    
    render() {
        const {configData, btnConfig} = {...this.props};
        return (
            <Select
                defaultValue='All'
                style={btnConfig}
                onChange={this.selectItemChange}
            >
                {
                    configData.item.map((item) => {
                        return (
                            <Option
                                key={item.key}
                                value={item.itemName}
                            >
                                {item.itemName}
                            </Option>
                        );
                    })
                }
            </Select>
        );
    }
}

SelectDropdown.propTypes = {
    configData: PropTypes.object.isRequired,
    btnConfig: PropTypes.object.isRequired,
    itemClickAction: PropTypes.func.isRequired
};

