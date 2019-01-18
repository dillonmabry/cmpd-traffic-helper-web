const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/client/index.js'],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        alias: {
            'react-virtualized/List': 'react-virtualized/dist/es/List',
        }
    }
};