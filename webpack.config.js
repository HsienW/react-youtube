const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    // entry: {
    //     index: './src/index.jsx',
    //     vendor: [
    //         'is_js',
    //         'axios',
    //         'react',
    //         'react-dom',
    //         'react-redux',
    //         'react-router',
    //         'react-router-redux',
    //         'redux',
    //         'redux-actions',
    //         'redux-thunk',
    //         'react-final-form',
    //         'react-player',
    //     ],
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].bundle.js',
    // },
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
                test: /\.(css|scss)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=8192'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
        }
    },
    optimization: {
    //     minimizer: [
    //         new UglifyJSPlugin({
    //             cache: true,
    //             parallel: true,
    //             uglifyOptions: {
    //                 compress: {
    //                     unused: true,
    //                     warnings: false,
    //                 },
    //                 ecma: 8,
    //                 warnings: false,
    //                 mangle: true,
    //             },
    //             sourceMap: false
    //         })
    //     ],
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'youtube',
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new MiniCssExtractPlugin({
            filename: 'index.bundle.css',
        }),
        new CompressionPlugin(),
        new BundleAnalyzerPlugin()
        // new HardSourceWebpackPlugin()
    ],
};
