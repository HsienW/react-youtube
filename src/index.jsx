import React from 'react';
import createHistory from 'history/createHashHistory';
import ReduxStore from './Redux/ReduxStore';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import {Auth, Home, MyUpload, Search, Play, MyChannel} from './page-loadable';
import {Portal} from '../src/Containers/index';
import {CommonModule} from '../src/Components/common-module';
import 'antd/dist/antd.min.css';
import './Common/CoverStyle.css';

const history = createHistory();

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={history}>
                <div style={{width: '100%', height: '100%'}}>
                    <Route component={Portal}/>
                    <Switch>
                        <Route path='/auth' component={Auth}/>
                        <CommonModule>
                            <Route path='/home' component={Home}/>
                            <Route path='/my-upload' component={MyUpload}/>
                            <Route path='/search' component={Search}/>
                            <Route path='/play' component={Play}/>
                            <Route path='/my-channel' component={MyChannel}/>
                        </CommonModule>
                    </Switch>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));
