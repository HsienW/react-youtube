import React from 'react';
import Loadable from 'react-loadable';

const LoadingPage = () => {
    return (<div>Loading...</div>);
};

export const Auth = Loadable({
    loader: () => import('./Containers/Auth/Auth'),
    loading: LoadingPage
});

export const Home = Loadable({
    loader: () => import('./Containers/Home/Home'),
    loading: LoadingPage
});

export const Play = Loadable({
    loader: () => import('./Containers/Play/Play'),
    loading: LoadingPage
});

export const Channel = Loadable({
    loader: () => import('./Containers/MyChannel/MyChannel'),
    loading: LoadingPage
});

export const Search = Loadable({
    loader: () => import('./Containers/Search/Search'),
    loading: LoadingPage
});

export const Upload = Loadable({
    loader: () => import('./Containers/Upload/Upload'),
    loading: LoadingPage
});
