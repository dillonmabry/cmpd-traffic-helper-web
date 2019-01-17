const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const outputDirectory = 'dist';

module.exports = (env, options) => {
  // DEV
  if (options.mode === 'development') {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});

    return {
      entry: ['babel-polyfill', './src/client/index.js'],
      output: {
        path: path.join(__dirname, outputDirectory),
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
      devServer: {
        port: 3000,
        open: true,
        proxy: {
          '/api': 'http://localhost:5000'
        },
        historyApiFallback: true
      },
      plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        }),
        new webpack.DefinePlugin(envKeys)
      ],
      resolve: {
        alias: {
          'react-virtualized/List': 'react-virtualized/dist/es/List',
        }
      }
    }
  // PROD
  } else {
    return {
      entry: ['babel-polyfill', './src/client/index.js'],
      output: {
        path: path.join(__dirname, outputDirectory),
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
      devServer: {
        port: 3000,
        open: true,
        proxy: {
          '/api': 'http://localhost:5000'
        },
        historyApiFallback: true
      },
      plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ],
      resolve: {
        alias: {
          'react-virtualized/List': 'react-virtualized/dist/es/List',
        }
      }
    }
  }
};