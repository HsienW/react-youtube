import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Button, Icon, Menu} from 'antd';

export default class ListDropdown extends Component {

    listItemClick = (event) => {
        this.props.itemClickAction(event);
    };

    render() {
        const {configData, btnConfig} = {...this.props};
        const list = (
            <Menu onClick={this.listItemClick}>
                {
                    configData.item.map((item) => {
                        return (
                            <Menu.Item
                                key={item.key}
                                type={item.type}
                            >
                                {configData.itemIconShow ? <Icon type={item.itemIcon}/> : null}
                                {item.itemName}
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        );
        return (
            <Dropdown overlay={list}>
                <Button style={btnConfig}>
                    {configData.dropdownName} <Icon type={configData.iconType}/>
                </Button>
            </Dropdown>
        );
    }
}

ListDropdown.propTypes = {
    configData: PropTypes.object.isRequired,
    btnConfig: PropTypes.object.isRequired,
    itemClickAction: PropTypes.func.isRequired
};

