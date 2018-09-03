import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReduxStore from './Config/ReduxStore';
import {HashRouter, Router} from 'react-router-dom';
import createHistory from 'history/createHashHistory';

const history = createHistory();

const MainStyle = {
    width: '100%',
    height: '100%',
};

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={history}>
                <div style={MainStyle}>
                </div>
            </Router>
        </HashRouter>
    </>
), document.getElementById('app'));