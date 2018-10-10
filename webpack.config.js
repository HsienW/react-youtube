const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.jsx',
        vendor: [
            'is_js',
            'axios',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-actions',
            'redux-thunk',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
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
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 8,
                    warnings: false,
                    mangle: true
                },
                sourceMap: false
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'youtube',
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new CompressionPlugin()
    ],
    devServer: {
        port: 8080,
    },
};