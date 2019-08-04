import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Button, Icon, Card, List, Avatar} from 'antd';

export default class ContentDropdown extends Component {
    render() {
        const {configData, contentData ,btnConfig, contentBodyStyle} = {...this.props};
        const list = (
            <Card style={contentBodyStyle}>
                <List
                    itemLayout={configData.contentLayoutType}
                    dataSource={contentData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={<a href="https://">{item.title}</a>}
                                description="The trade talks between Beijing and Washington appear to have unraveled."
                            />
                        </List.Item>
                    )}
                />
            </Card>
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

ContentDropdown.propTypes = {
    configData: PropTypes.object.isRequired,
    contentData: PropTypes.array.isRequired,
    btnConfig: PropTypes.object.isRequired,
    contentBodyStyle: PropTypes.object.isRequired,
};

