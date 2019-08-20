import {combineReducers} from 'redux';
import PortalReducer from '../Redux/Modules/Portal/PortalRedux';
import AuthReducer from '../Redux/Modules/Auth/AuthRedux';
import MyChannelReducer from '../Redux/Modules/Channel/MyChannelRedux';
import HomeReducer from '../Redux/Modules/Home/HomeRedux';
import HeaderReducer from '../Redux/Modules/Header/HeaderRedux';
import PlayReducer from '../Redux/Modules/Play/PlayRedux';
import SearchReducer from '../Redux/Modules/Search/SearchRedux';
import UploadReducer from '../Redux/Modules/Upload/UploadRedux';

const RootReducer = combineReducers({
    PortalReducer,
    AuthReducer,
    MyChannelReducer,
    HomeReducer,
    HeaderReducer,
    PlayReducer,
    SearchReducer,
    UploadReducer
});

export default RootReducer;
