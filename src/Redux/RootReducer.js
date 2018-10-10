import {combineReducers} from 'redux';
import AuthReducer from '../Redux/Modules/Auth/AuthReducer';
import ChannelReducer from '../Redux/Modules/Channel/ChannelReducer';
import HomeReducer from '../Redux/Modules/Home/HomeReducer';
import PlayReducer from '../Redux/Modules/Play/PlayReducer';
import SearchReducer from '../Redux/Modules/Search/SearchReducer';
import UploadReducer from '../Redux/Modules/Upload/UploadReducer';

const RootReducer = combineReducers({
    AuthReducer,
    ChannelReducer,
    HomeReducer,
    PlayReducer,
    SearchReducer,
    UploadReducer
});

export default RootReducer;
