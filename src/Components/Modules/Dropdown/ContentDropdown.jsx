import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';

export default class ContentDropdown extends Component {
    
    state = {
        visible: false,
    };
    
    handleVisibleChange = showState => {
        this.setState({visible: showState});
    };
    
    render() {
        const {configData, contentData, btnConfig, contentBodyStyle} = {...this.props};
        const list = (
            <Card style={contentBodyStyle}>
                <List
                    itemLayout={configData.contentLayoutType}
                    dataSource={contentData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.imgURL}/>}
                                title={<a>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
        return (
            <Dropdown
                overlay={list}
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
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

