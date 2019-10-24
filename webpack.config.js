const path = require('path');
let glob = require("glob");

let entry = __dirname + "/app/src/js/page.js";
let outputPath = path.resolve(__dirname, 'dist');
let filenameJS = '[name].[chunkhash].js';
let filenameCSS = 'main.[contenthash].css';
let devtool = '';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

if (process.env.TESTBUILD) {
    entry = glob.sync(__dirname + "/app/test/**/*.test.js");
    filenameJS = 'main.js';
    filenameCSS = 'main.css';
    outputPath =  path.resolve(__dirname, 'test-dist');
    devtool = "source-map";
}

module.exports = {
    entry: {
        main: entry
    },
    output: {
        path: outputPath,
        // filename: '[name].[chunkhash].js'
        filename: filenameJS
    },
    devtool: devtool,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin( {
            // filename: 'main.[contenthash].css'
            filename: filenameCSS
        } ),
        new HtmlWebpackPlugin( {
            inject: false,
            hash: true,
            template: './app/src/index.html',
            filename: 'index.html'
        } )
    ]
};