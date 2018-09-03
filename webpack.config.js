const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.jsx',
        // vendor: [
        //     'babel-polyfill',
        //     'is_js',
        //     'react',
        //     'react-dom',
        //     'react-redux',
        //     'react-router',
        //     'react-router-redux',
        //     'redux',
        //     'redux-actions',
        //     'redux-thunk',
        // ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: 'eslint-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=8192'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'youtube',
            template: 'dist/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        port: 8080,
    },
};