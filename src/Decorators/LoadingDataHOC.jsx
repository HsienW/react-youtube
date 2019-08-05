import React from 'react';
// import {Spin} from 'antd';
// import {SpinStyle} from '../Common/Style';

// export const LoadingDataHOC = ({props}) => (WrappedComponent) => {
//     return class loadingDataHOC extends Component {
//
//         // constructor(props) {
//         //     super(props);
//         //     this.state = {
//         //         showLoading: true
//         //     };
//         // }
//         //
//         // toggleShowLoading = (toggleState) => {
//         //     this.setState({
//         //         showLoading: toggleState,
//         //     });
//         // };
//
//         render() {
//             console.log('xxxxxxxxxxxxxxx');
//             console.log({...props});
//             // if (this.state.showLoading) {
//             //     return (
//             //         <Spin size='large' style={SpinStyle}>
//             //             <WrappedComponent {...this.props} toggleShowLoading={this.toggleShowLoading}/>
//             //         </Spin>
//             //     );
//             // }
//             return (
//                 <WrappedComponent {...this.props} toggleShowLoading={this.toggleShowLoading}/>
//             );
//         }
//     };
// };

export function LoadingDataHOC({props}) {
    return function WrappedComponent() {
        console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[');
        console.log(props);
        return (
            <WrappedComponent />
        );
    };
}
