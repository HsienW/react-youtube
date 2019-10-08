import React from 'react';
import Loadable from 'react-loadable';

const LoadingPage = () => {
    return (<div>Loading...</div>);
};

// export const Auth = Loadable({
//     loader: () => import('./Containers/Auth/Auth'),
//     loading: LoadingPage
// });
//
// export const Home = Loadable({
//     loader: () => import('./Containers/Home/Home'),
//     loading: LoadingPage
// });
//
// export const Play = Loadable({
//     loader: () => import('./Containers/Play/Play'),
//     loading: LoadingPage
// });
//
// export const MyChannel = Loadable({
//     loader: () => import('./Containers/Channel/MyChannel'),
//     loading: LoadingPage
// });
//
// export const Search = Loadable({
//     loader: () => import('./Containers/Search/Search'),
//     loading: LoadingPage
// });
//
// export const MyUpload = Loadable({
//     loader: () => import('./Containers/Upload/MyUpload'),
//     loading: LoadingPage
// });

const Auth = {
    path: '/auth',
    loadable: Loadable({
        loader: () => import('./Containers/Auth/Auth'),
        loading: LoadingPage
    })
};

const Home = {
    path: '/home',
    loadable: Loadable({
        loader: () => import('./Containers/Home/Home'),
        loading: LoadingPage
    })
};

const Play = {
    path: '/play',
    loadable: Loadable({
        loader: () => import('./Containers/Play/Play'),
        loading: LoadingPage
    })
};

const MyChannel = {
    path: '/my-channel',
    loadable: Loadable({
        loader: () => import('./Containers/Channel/MyChannel'),
        loading: LoadingPage
    })
};

const Search = {
    path: '/search',
    loadable: Loadable({
        loader: () => import('./Containers/Search/Search'),
        loading: LoadingPage
    })
};

const MyUpload = {
    path: '/my-upload',
    loadable: Loadable({
        loader: () => import('./Containers/Upload/MyUpload'),
        loading: LoadingPage
    })
};

export const pageLoadable = [
    Auth,
    Home,
    Play,
    MyChannel,
    Search,
    MyUpload
];

