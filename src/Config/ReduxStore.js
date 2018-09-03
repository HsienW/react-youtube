import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import MainReducer from './../Modules/Main/Reducer/MainReducer';

const ReduxStore = createStore(MainReducer, applyMiddleware(reduxThunk));

export default ReduxStore;