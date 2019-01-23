import {combineReducers} from 'redux';
import PortalReducer from '../Redux/Modules/Portal/PortalRedux';
import AuthReducer from '../Redux/Modules/Auth/AuthRedux';
import ChannelReducer from '../Redux/Modules/Channel/ChannelRedux';
import HomeReducer from '../Redux/Modules/Home/HomeRedux';
import PlayReducer from '../Redux/Modules/Play/PlayRedux';
import SearchReducer from '../Redux/Modules/Search/SearchRedux';
import UploadReducer from '../Redux/Modules/Upload/UploadRedux';

const RootReducer = combineReducers({
    PortalReducer,
    AuthReducer,
    ChannelReducer,
    HomeReducer,
    PlayReducer,
    SearchReducer,
    UploadReducer
});

export default RootReducer;
