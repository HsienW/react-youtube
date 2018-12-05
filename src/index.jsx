import React from 'react';
import createHistory from 'history/createHashHistory';
import ReduxStore from './Redux/ReduxStore';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import {Auth, Home, Upload, Search, Play, Channel} from '../src/Containers/index';
import 'antd/dist/antd.css';

const history = createHistory();

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={history}>
                <div style={{width: '100%', height: '100%'}}>
                    <Switch>
                        <Route path="/auth" component={Auth}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/upload" component={Upload}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/play" component={Play}/>
                        <Route path="/channel" component={Channel}/>
                    </Switch>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));
