import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from '../Redux/RootReducer';

const ReduxStore = createStore(RootReducer, applyMiddleware(reduxThunk));

export default ReduxStore;