import React, {Component} from 'react';

const AsyncDataSourceHOC = (WrappedComponent) => {
    class getData extends Component {

        constructor() {
            super();
            this.state = {
                data: []
            };
        }

        componentDidMount() {}

        render() {
            return (
                <WrappedComponent dataSource={this.state.data} />
            );
        }
    }

    return getData;
};

export default AsyncDataSourceHOC;
