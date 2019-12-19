import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createHashHistory';
import ReduxStore from './Redux/ReduxStore';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import {Auth, Home, MyUpload, Search, Play, MyChannel} from './page-loadable';
import {Portal} from '../src/Containers/index';
import {Header, ActionAlert} from './Components/Layout';
import './Common/HandleAntStyle';
import './Common/CoverStyle.css';

// CommonLayoutContext.Consumer
const History = createHistory();
export const CommonLayoutContext = React.createContext({path: ''});

class CommonLayoutProvider extends Component {
    
    state = {
        showLoading: false,
    };
    
    toggleShowLoading = (toggleState) => {
        this.setState({
            showLoading: toggleState,
        });
    };
    
    render() {
        return (
            <CommonLayoutContext.Provider
                value={{
                    showLoading: this.state.showLoading,
                    toggleShowLoading: this.toggleShowLoading
                }}
            >
                <Header/>
                <ActionAlert/>
                {this.props.children}
            </CommonLayoutContext.Provider>
        );
    }
}

CommonLayoutProvider.propTypes = {
    children: PropTypes.object.isRequired
};

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={History}>
                <div style={{width: '100%', height: '100%'}}>
                    <Route component={Portal}/>
                    <Switch>
                        <Route path='/auth' component={Auth}/>
                        <CommonLayoutProvider>
                            <Route path='/home' component={Home}/>
                            <Route path='/my-upload' component={MyUpload}/>
                            <Route path='/search' component={Search}/>
                            <Route path='/play' component={Play}/>
                            <Route path='/my-channel' component={MyChannel}/>
                        </CommonLayoutProvider>
                    </Switch>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));

